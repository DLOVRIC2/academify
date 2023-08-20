import arxiv
import pandas as pd
import json
from dateutil import parser
from typing import Generator, Any
from dataclasses import dataclass
from dotenv import load_dotenv
load_dotenv()

@dataclass
class Article:
    title: str
    authors: list
    abstract: str
    published: str
    categories: list
    pdf_url: str


class SearchEngine:
    def __init__(self):
        # Predefined tags mapping to arXiv categories
        self.tags = {
            'Physics': 'physics',
            'Mathematics': 'math',
            'Computer Science': 'cs',
            'AI': 'cs.AI',
            'Economics': 'econ',
            'Quantitative Finance': 'quantitative finance'
        }

    def search_by_title(self, title, max_results=10, sort_by: str = arxiv.SortCriterion.SubmittedDate, sort_order: str = arxiv.SortOrder.Descending):
        # Search by title
        search = arxiv.Search(
            query=title,
            max_results=max_results,
            sort_by=sort_by,
            sort_order=sort_order,
        )
        articles = self._convert_to_objects(search.results())
        json_data = self._convert_to_json(articles)
        return json_data, articles

    def search_by_tag(self, tag, max_results=10, sort_by: str = arxiv.SortCriterion.SubmittedDate, sort_order: str = arxiv.SortOrder.Descending):
        # Search by tag
        category = self.tags.get(tag)
        if category:
            search = arxiv.Search(
                query=f'{category}',
                max_results=max_results,
                sort_by=sort_by,
                sort_order=sort_order,
            )
            articles = self._convert_to_objects(search.results())
            json_data = self._convert_to_json(articles)
            return json_data, articles
        else:
            raise ValueError(f"Tag {tag} not found in predefined tags")
        
    def _convert_to_objects(self, search_generator: Generator[Any, None, None]) -> list:
        articles = []
        for result in search_generator:
            published_date_string = None
            try:
                # Trying different date formats to make sure code doens't fail on a single format.
                published_datetime = parser.parse(str(result.published))
                published_date_string = published_datetime.strftime("%Y-%m-%d")
            except (AttributeError, ValueError):
                pass  # Continue if parsing fails

            # Parsing and data conversion code...
            article = Article(
                title=result.title,
                authors=[str(author) for author in result.authors],
                abstract=result.summary,
                published=published_date_string,
                categories=result.categories,
                pdf_url=result.pdf_url,
            )
            articles.append(article)
        return articles
    
    def _convert_to_json(self, articles: list) -> str:
        data = [article.__dict__ for article in articles]
        return json.dumps(data)

    
    @staticmethod
    def _save_json(data, filename):
        with open(filename, "w") as f:
            f.write(data)


if __name__ == "__main__":

    engine = SearchEngine()
    json_data, articles = engine.search_by_title("Chat GPT")
    # engine._save_json(json_data, filename="search_results.json")
    x = 5
