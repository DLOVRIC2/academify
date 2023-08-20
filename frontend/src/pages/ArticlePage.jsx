import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import './style/ArticlePage.css';

const ArticlePage = () => {
  const location = useLocation();
  const article = location.state?.article;
  const [showChat, setShowChat] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [sessionId, setSessionId] = useState(null);


  const handleQAButtonClick = async () => {
    try {
      const response = await fetch('/start_conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article: article })
      });
      const data = await response.json();
      setSessionId(data.session_id);
      setShowChat(true);
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  const handleSendMessage = async () => {
    if (messageInput.trim() === '' || !sessionId) return; // Prevent sending empty messages

    try {
      const response = await fetch(`/chat/${sessionId}`, {
        method: 'GET',
        params: { message: messageInput }
      });
      const botResponse = await response.text();

      setChatHistory([...chatHistory, { user: 'User', text: messageInput }, { user: 'Bot', text: botResponse }]);
      setMessageInput(''); // Clear the input field
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="article-container">
      <div className="article-details">
        <h1 className="article-title">Title: {article.title}</h1>
        <h2 className="article-authors">Authors: {article.authors.join(', ')}</h2>
        <p className="article-abstract">Abstract: {article.abstract}</p>
        <a href={article.pdf_url} target="_blank" rel="noopener noreferrer" className="article-pdf-link">Download PDF</a>
        <div className="article-buttons">
          <button className="article-button qa-button" onClick={handleQAButtonClick}>Q&A</button>
          <button className="article-button linked-post-button">Linked Post</button>
          <button className="article-button tweet-button">Tweet</button>
        </div>
      </div>
      {showChat && (
        <div className="chat-window">
          <div className="chat-container">
            <div className="chat-history">
              {chatHistory.map((message, index) => (
                <div key={index} className={`chat-message ${message.user.toLowerCase()}`}>
                  <span className="chat-user">{message.user}:</span> {message.text}
                </div>
              ))}
            </div>
            <input
              type="text"
              value={messageInput}
              onChange={handleInputChange}
              className="chat-input"
              placeholder="Type your question..."
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
