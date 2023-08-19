from langchain.vectorstores import Chroma
from chromadb import PersistentClient
from constants import PERSIST_DIRECTORY, EMBEDDINGS_MODEL_NAME
from langchain.embeddings import OpenAIEmbeddings
import os
import glob
from dotenv import load_dotenv

# Load API keys
current_directory = os.path.dirname(__file__)
env_location = os.path.join(current_directory, ".env")
load_dotenv(env_location)


class VectorDBRetriever:

    def __init__(self, n_return_documents=3):
        
        client = PersistentClient(
            path=PERSIST_DIRECTORY
        )
        # Setup chroma db
        embeddings = OpenAIEmbeddings(
            openai_api_key=os.environ.get("OPENAI_API_KEY"),
            model=EMBEDDINGS_MODEL_NAME,
        )

        self.db = Chroma(
            client=client,
            embedding_function=embeddings,
        )

        self.retriever = self.db.as_retriever(search_kwargs={"k":n_return_documents})

    def get_relevant_documents(self, query):
        return self.retriever.get_relevant_documents(query)

    @staticmethod
    def _does_vectorstore_exist(path_to_vector_db: str = None) -> bool:
        """
        Checks if the vectorstore exists. Index folder inside the persist directory must contain at least 3 items.
        """
        if not path_to_vector_db:
            path_to_vector_db = PERSIST_DIRECTORY

        vector_store_location = os.path.join(path_to_vector_db, "index")
        if os.path.exists(vector_store_location):
            list_index_files = glob.glob(os.path.join(path_to_vector_db, "index/*.bin"))
            list_index_files += glob.glob(os.path.join(path_to_vector_db, "index/*.pkl"))
            # If length > 3 then the vectore store is established
            if len(list_index_files) > 3:
                return True
        return False
    
    





if __name__ == "__main__":

    vdb = VectorDBRetriever()

    print(vdb.does_vectorstore_exist())