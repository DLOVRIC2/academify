import React from "react";
import { useLocation } from 'react-router-dom';
import './style/ArticlePage.css';

const ArticlePage = () => {
  const location = useLocation();
  const article = location.state?.article;

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="article-container">
      <h1 className="article-title">Title: {article.title}</h1>
      <h2 className="article-authors">Authors: {article.authors.join(', ')}</h2>
      <p className="article-abstract">Abstract: {article.abstract}</p>
      <a href={article.pdf_url} target="_blank" rel="noopener noreferrer" className="article-pdf-link">Download PDF</a>
    </div>
  );
};

export default ArticlePage;
