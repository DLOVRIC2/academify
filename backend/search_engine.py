import arxiv
import pandas as pd
import json
from dateutil import parser
from typing import Generator, Any
from dotenv import load_dotenv
load_dotenv()


class SearchEngine:
    def __init__(self):
        # Predefined tags mapping to arXiv categories
        self.tags = {
            'Physics': 'physics',
            'Mathematics': 'mathematics',
            'Computer Science': 'computer science',
            'AI': 'artificial intelligence',
            'Economics': 'economics',
            'Quantitative Finance': 'quantitative-finance'
        }

    def search_by_title(self, title, max_results=10, sort_by: str = arxiv.SortCriterion.Relevance, sort_order: str = arxiv.SortOrder.Descending):
        # Search by title
        search = arxiv.Search(
            query=title,
            max_results=max_results,
            sort_by=sort_by,
            sort_order=sort_order,
        )
        return search.results()

    def search_by_tag(self, tag, max_results=10, sort_by: str = arxiv.SortCriterion.Relevance, sort_order: str = arxiv.SortOrder.Descending):
        # Search by tag
        category = self.tags.get(tag)
        if category:
            search = arxiv.Search(
                query=f'{category}',
                max_results=max_results,
                sort_by=sort_by,
                sort_order=sort_order,
            )
            return search.results()
        else:
            raise ValueError(f"Tag {tag} not found in predefined tags")
    
    @staticmethod
    def _convert_to_json(search_generator: Generator[Any, None, None]) -> str:
        data = []
        for result in search_generator:
            published_date_string = None
            try:
                # Trying different date formats to make sure code doens't fail on a single format.
                published_datetime = parser.parse(str(result.published))
                published_date_string = published_datetime.strftime("%Y-%m-%d")
            except (AttributeError, ValueError):
                pass  # Continue if parsing fails

            result_data = {
                "title": result.title,
                "authors": [str(author) for author in result.authors],
                "abstract": result.summary,
                "published": published_date_string,
                "categories": result.categories,
                "pdf_url": result.pdf_url,
            }
            data.append(result_data)
        return json.dumps(data)
    
    @staticmethod
    def _save_json(data, filename):
        with open(filename, "w") as f:
            f.write(data)


if __name__ == "__main__":

    engine = SearchEngine()

    # results = engine.search_by_title("Chat gpt", max_results=10)
    results = engine.search_by_tag("Physics")

    data = engine._convert_to_json(results)

    engine._save_json(data, filename="search_results.json")

    x = 5
