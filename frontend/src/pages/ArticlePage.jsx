import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import './style/ArticlePage.css';
import ReactLoading from 'react-loading';
import robot from "./images/robot.png";
import human from "./images/human.png";


const ArticlePage = () => {
  const location = useLocation();
  const article = location.state?.article;
  const [showChat, setShowChat] = useState(false);
  // Initialize the chat history with the bot's greeting
  const [chatHistory, setChatHistory] = useState([
    {
      user: 'Bot',
      text: "Hey! Ask me any question about this paper. I'll do my best to help.",
    },
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [loading, setLoading] = useState(false);



  const handleQAButtonClick = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/start_conversation', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ article: article })
      });
      const data = await response.json();
      setSessionId(data.session_id);
      setShowChat(true);
      setLoading(false);
    } catch (error) {
      console.error('Error starting conversation:', error);
    }
  };

  const handleSendMessage = async () => {
    if (messageInput.trim() === '' || !sessionId) return; // Prevent sending empty messages
  
    // Add the user's message to the chat history immediately
    setChatHistory([...chatHistory, { user: 'User', text: messageInput }]);
    setMessageInput(''); // Clear the input field
  
    try {
      const response = await fetch(`http://localhost:8000/chat/${sessionId}?message=${encodeURIComponent(messageInput)}`, {
        method: 'GET'
      });
  
      const responseText = await response.text();
      const botResponse = JSON.parse(responseText);
      setChatHistory([...chatHistory, { user: 'User', text: messageInput }, { user: 'Bot', text: botResponse }]);
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
        {loading && (
          <div className="loading-container">
            <ReactLoading className="loader" type={"balls"} color={"#333"} />
            <div className="loading-message">Processing your article</div>
          </div>
        )}

      {showChat && (
        <div className="chat-container">
          <div className="chat-history">
            {chatHistory.length === 0 && (
              <div className="chat-message bot">
                <img src={robot} alt="Bot" className="chat-icon" /> {/* Bot icon */}
                <span className="chat-user">Bot:</span> Hey! Ask me any question about this paper. I'll do my best to help.
              </div>
            )}
            {chatHistory.map((message, index) => (
              <div key={index} className={`chat-message ${message.user.toLowerCase()}`}>
                <img src={message.user === 'Bot' ? robot : human} alt={message.user} className="chat-icon" /> {/* Conditional rendering of User/Bot icon */}
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
      )}
    </div>
  );
};

export default ArticlePage;
