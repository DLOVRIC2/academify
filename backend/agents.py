from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain, SequentialChain, SimpleSequentialChain
from langchain.memory import ConversationBufferMemory
from langchain.document_loaders import OnlinePDFLoader
from langchain.text_splitter import CharacterTextSplitter
from search_engine import SearchEngine
from retriever import VectorDBRetriever
from langchain.vectorstores import Chroma


import openai
import os
from dotenv import load_dotenv

# Paths
current_directory = os.path.dirname(__file__)
load_dotenv(current_directory)



class ArticleAgent(SearchEngine, VectorDBRetriever):
    def __init__(self, api_key: str = None, model: str = "gpt3.5-turbo", temperature: float = 0.9):
        
        self.llm = OpenAI(temperature=temperature,
                          openai_api_key=os.environ.get("OPENAI_API_KEY", api_key))
    
    def _process_article(self, article) -> list:
        try:
            # Load the PDF directly from the arxiv
            loader = OnlinePDFLoader(article.pdf_url)
            
            # Split the text into chunks
            text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
            documents = text_splitter.split_documents(loader.load())

            # Ingest the documents (This method is inherited from VectorDBRetriever)
            

            return loader.load()
        except Exception as e:
            print(f"Couldn't process the pdf. Exception raised {e}")


if __name__ == "__main__":
    
    agent = ArticleAgent()
    json_data, articles = agent.search_by_title("Chat GPT")

    loaded_pdf = agent._load_article(articles[0])

    x = 5


