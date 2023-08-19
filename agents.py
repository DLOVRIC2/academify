from langchain.llms import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain, SequentialChain, SimpleSequentialChain
from langchain.memory import ConversationBufferMemory

import openai
import os
from dotenv import load_dotenv

# Paths
current_directory = os.path.dirnmae(__file__)
load_dotenv(current_directory)



class ArticleAgent:
    def __init__(self, api_key: str = None, model: str = "gpt3.5-turbo", temperature: float = 0.9):
        
        self.llm = OpenAI(temperature=temperature,
                          openai_api_key=os.environ.get("OPENAI_API_KEY", api_key))
    
    def _process_pdf(self, article):
        pass