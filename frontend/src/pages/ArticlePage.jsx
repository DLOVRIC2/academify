import React from "react";
import { useLocation } from 'react-router-dom';

const ArticlePage = () => {
  const location = useLocation();
  const article = location.state?.article;

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <h1>Title: {article.title}</h1>
      <h2>Authors: {article.authors.join(', ')}</h2>
      <p>Abstract: {article.abstract}</p>
    </div>
  );
};

export default ArticlePage;
