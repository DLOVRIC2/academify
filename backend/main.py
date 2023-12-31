from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.exceptions import HTTPException
from pydantic import BaseModel
from agents import ArticleAgent
from search_engine import SearchEngine, Article
from fastapi.middleware.cors import CORSMiddleware
from dataclasses import asdict
import json


app = FastAPI()
engine = SearchEngine()

# Using a dictionary to store ongoing conversations (consider using Redis or a database in production)
conversations = {}

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://3.94.209.49:3000",
    "http://3.94.209.49",
    "http://backend:8000",
    "http://academify_backend_1:8000",

]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StartConversationRequest(BaseModel):
    article: Article

@app.get("/search/title/{title}")
def search_by_title(title: str, max_results: int = 10):
    json_data, _ = engine.search_by_title(title, max_results)
    return json_data

@app.get("/search/tag/{tag}")
def search_by_tag(tag: str, max_results: int = 10):
    json_data, _ = engine.search_by_tag(tag, max_results)
    return json_data


@app.post("/start_conversation")
def start_conversation(request: StartConversationRequest):
    article = request.article
    agent = ArticleAgent()
    vectorstore = agent.process_article(asdict(article))
    if vectorstore is None:
        raise HTTPException(status_code=400, detail="Error processing article")

    agent.vectorstore = vectorstore
    session_id = str(len(conversations))
    conversations[session_id] = {
        "article": asdict(article),
        "chat_bot": agent,
    }
    return {"session_id": session_id}



@app.get("/chat/{session_id}")
async def chat(session_id: str, message: str):
    session = conversations.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    def generate_response():
        for response_chunk in session["chat_bot"].llm_chat(message):
            # Wrap each chunk in a JSON object
            yield json.dumps({"text": response_chunk})

    return StreamingResponse(generate_response(), media_type="application/json")
