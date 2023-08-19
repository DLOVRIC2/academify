import React, { useState, useEffect } from "react";

const Search = () => {
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

  const handleSearch = () => {
    let url;
    if (predefinedTags.includes(searchQuery)) {
      url = `http://localhost:8000/search/tag/${searchQuery}`;
    } else {
      url = `http://localhost:8000/search/title/${searchQuery}`;
    }
  
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    if (typeof data === "string") {
      data = JSON.parse(data);
    }
    console.log("Received data:", data); // log the data
    setArticles(data); // Set the state directly with the parsed data
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

  return (
    <div>
      <h1>Search the topic you are interested in</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {predefinedTags.map((tag) => (
          <button key={tag} onClick={() => handleTagClick(tag)}>
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
            <tr key={article.title} onClick={() => handleRowClick(article)}>
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
