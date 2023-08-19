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
    
    def _process_article(self, article) -> list:
        try:
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
    

    def _llm_chat(self):
        llm = ChatOpenAI(temperature=0, model="gpt-3.5-turbo-0613")


        _, articles = self.search_by_title("Chat GPT")

        docsearch = self._process_article(articles[0])

        qa_chain = create_qa_with_sources_chain(llm=llm)

        doc_prompt = PromptTemplate(
            template="Content: {page_content}\nSource: {source}",
            input_variables=["page_content", "source"]
        )

        final_qa_chain = StuffDocumentsChain(
            llm_chain=qa_chain,
            document_variable_name="context",
            document_prompt=doc_prompt,
        )

        memory = ConversationBufferMemory(
            memory_key="chat_history",
            return_messages=True
        )

        _template = """Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.\
        Make sure to avoid using any unclear pronouns.

        Chat History:
        {chat_history}
        Follow Up Input: {question}
        Standalone question:"""
        CONDENSE_QUESTION_PROMPT = PromptTemplate.from_template(_template)

        condense_question_chain = LLMChain(
            llm=llm,
            prompt=CONDENSE_QUESTION_PROMPT
        )

        qa = ConversationalRetrievalChain(
            question_generator=condense_question_chain,
            retriever=docsearch.as_retriever(),
            memory=memory,
            combine_docs_chain=final_qa_chain,
        )
        

        chat = True
        while chat:
            query = input("What is your question: ")
            print(qa({"question": str(query)}))



    def main(self):

        json_data, articles = self.search_by_title("Chat GPT")
        self._process_article(article=articles[0])
        # self._llm_chat()




if __name__ == "__main__":
    
    agent = ArticleAgent()
    agent._llm_chat()


