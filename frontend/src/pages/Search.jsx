import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './style/Search.css';

const Search = () => {
  const apiUrl = 'http://backend:8000';
  const navigate = useNavigate(); 
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const predefinedTags = [
    "Physics",
    "Mathematics",
    "Computer Science",
    "AI",
    "Economics",
    "Quantitative Finance",
  ];

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
  };

  const handleSearch = (e) => {
    
    e.preventDefault(); // Prevent default form submission
    let url;
    if (predefinedTags.includes(searchQuery)) {
        url = `${apiUrl}/search/tag/${searchQuery}`;
    } else {
        url = `${apiUrl}/search/title/${searchQuery}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (typeof data === "string") {
          data = JSON.parse(data);
        }
        console.log("Received data:", data);
        setArticles(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    console.log("Articles state changed:", articles);
    console.log("Type of articles state:", typeof articles);
    if (!Array.isArray(articles)) {
      console.error("Articles state is not an array!");
    }
  }, [articles]);

  const handleRowClick = (article) => {
    setSelectedArticle(article);
  };


  const handleGoClick = () => {
    if (selectedArticle) {
      navigate(`/article/${encodeURIComponent(selectedArticle.title)}`, { state: { article: selectedArticle } });
    }
  };

  return (
    <div className="table-container">
      <h1 className="search-heading">Search the topic you are interested in</h1>
      <form onSubmit={handleSearch}> {/* Wrap the input and buttons in a form */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
        <button onClick={handleGoClick} className="search-button">Go</button>
      </form>
      <div>
        {predefinedTags.map((tag) => (
          <button key={tag} onClick={() => handleTagClick(tag)} className="tag-button">
            {tag}
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Authors</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr
            key={article.title}
            onClick={() => handleRowClick(article)}
            className={selectedArticle === article ? "selected-row" : ""}
            >              
                <td>{article.title}</td>
                <td>{article.authors.join(", ")}</td>
                <td>{article.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Search;