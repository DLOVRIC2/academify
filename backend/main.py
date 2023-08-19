from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.exceptions import HTTPException
from pydantic import BaseModel
from agents import ArticleAgent
from search_engine import SearchEngine, Article


app = FastAPI()
engine = SearchEngine()

# Using a dictionary to store ongoing conversations (consider using Redis or a database in production)
conversations = {}


@app.get("/search/title/{title}", response_model=str)
def search_by_title(title: str, max_results: int = 10):
    json_data, _ = engine.search_by_title(title, max_results)
    return json_data

@app.get("/search/tag/{tag}", response_model=str)
def search_by_tag(tag: str, max_results: int = 10):
    json_data, _ = engine.search_by_tag(tag, max_results)
    return json_data


@app.post("/start_conversation")
def start_conversation(article: Article):
    session_id = str(len(conversations))
    conversations[session_id] = {
        "article": article.dict(),
        "chat_bot": ArticleAgent(),
    }
    return {"session_id": session_id}


@app.get("/chat/{session_id}")
def chat(session_id: str, message: str):
    session = conversations.get(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    response = next(session["chat_bot"].llm_chat(session["article"], message))
    return response
