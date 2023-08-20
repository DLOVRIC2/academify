from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import ConversationalRetrievalChain, LLMChain
from langchain.memory import ConversationBufferMemory
from langchain.document_loaders import OnlinePDFLoader
from langchain.text_splitter import CharacterTextSplitter
from search_engine import SearchEngine
from retriever import VectorDBRetriever
from langchain.vectorstores import Chroma
from langchain.chains import RetrievalQA, create_qa_with_sources_chain
from langchain.chains.combine_documents.stuff import StuffDocumentsChain
from langchain.chat_models import ChatOpenAI
import json
from search_engine import Article



import openai
import os
from dotenv import load_dotenv

# Paths
current_directory = os.path.dirname(__file__)
env_path = os.path.join(current_directory, ".env")
load_dotenv(env_path)



class ArticleAgent(SearchEngine, VectorDBRetriever):
    def __init__(self, api_key: str = None, model: str = "gpt3.5-turbo", temperature: float = 0.9):
        VectorDBRetriever.__init__(self, n_return_documents=3)
        
        self.llm = OpenAI(temperature=temperature,
                          openai_api_key=os.environ.get("OPENAI_API_KEY", api_key))
        
        self.chat_llm = ChatOpenAI(temperature=0.7, model="gpt-3.5-turbo-0613")

        self.memory = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )

    
    def process_article(self, article_dict) -> None:
        try:
            if isinstance(article_dict, Article):
                article = article_dict
            else:
                article = Article(**article_dict)

            # Load the PDF directly from the arxiv
            loader = OnlinePDFLoader(article.pdf_url)
            
            # Split the text into chunks
            text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
            documents = text_splitter.split_documents(loader.load())

            # Adding sources
            for i, text in enumerate(documents):
                text.metadata["source"] = f"{i}-pl"

            # Check if the vectorstore exists
            # Ingest the documents (This method is inherited from VectorDBRetriever)
            if not self._does_vectorstore_exist():
                vectorstore = self.create_vectorstore(documents=documents)
            else:
                vectorstore = self.add_documents(documents=documents)
            
            print("Document is ready for Q&A")
            return vectorstore

        except Exception as e:
            print(f"Couldn't process the pdf. Exception raised {e}")
    
    def _condense_question_chain(self):
        _template = """Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.\
        Make sure to avoid using any unclear pronouns.

        Chat History:
        {chat_history}
        Follow Up Input: {question}
        Standalone question:"""
        CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template(_template)

        condense_question_chain = LLMChain(
            llm=self.chat_llm,
            prompt=CONDENSE_QUESTION_PROMPT
        )

        return condense_question_chain


    def llm_chat(self, question: str):
        """Allows for the Q&A with the context from the chosen scientific article."""
        # Processing and storing the article in the vector db
        if self.vectorstore is None:
            print("Error: Vectorstore not initialized. Cannot proceed with the chat")
            return

        # Setting up relevant chains to be able to retrieve context
        qa_chain = create_qa_with_sources_chain(llm=self.chat_llm)

        doc_prompt = PromptTemplate(
            template="Content: {page_content}\nSource: {source}",
            input_variables=["page_content", "source"]
        )

        final_qa_chain = StuffDocumentsChain(
            llm_chain=qa_chain,
            document_variable_name="context",
            document_prompt=doc_prompt,
        )
        
        # For history purposes, we are generating condense format of the input question
        condense_question_chain = self._condense_question_chain()

        qa = ConversationalRetrievalChain(
            question_generator=condense_question_chain,
            retriever=self.vectorstore.as_retriever(),
            memory=self.memory,
            combine_docs_chain=final_qa_chain,
        )
        
        bot_response = ""
        response = qa({"question": str(question)})
        bot_response = response["answer"]
        yield json.loads(bot_response)["answer"]



if __name__ == "__main__":
    
    agent = ArticleAgent()

    _, articles = agent.search_by_title("Chat GPT")
    agent.llm_chat(article_dict=articles[0], question="What are some key insights of this article?")


    x = 5