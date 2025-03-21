import React from "react";
import ArticleList from "../common/ArticleList";
import { useNewsArticles } from "../../services/newsService";
import { useStore } from "../../store";
import noImage from "../../asset/noImage.png";

const MainContent: React.FC = () => {
  const { filterOptions } = useStore<any>((state) => state);
  const {
    newsApiNews,
    newsApiLoading,
    guardianApiLoading,
    guardianApiNews,
    nytApiNews,
    nytApiLoading,
  } = useNewsArticles();

  return (
    <div className="flex flex-col flex-grow">
      {renderArticleList(
        "News Api",
        newsApiNews,
        newsApiLoading,
        filterOptions
      )}
      {renderArticleList(
        "The Guardian",
        guardianApiNews,
        guardianApiLoading,
        filterOptions
      )}
      {renderArticleList(
        "The New York Times",
        nytApiNews,
        nytApiLoading,
        filterOptions
      )}
    </div>
  );
};

const renderArticleList = (
  title: string,
  articles: any[],
  loading: boolean,
  filterOptions: any
) => {
  const articleItems = articles.map((news) => ({
    title: news?.webTitle || news?.abstract || news.title,
    image: news?.image || news?.urlToImage || noImage,
    source: news?.pillarId || news?.source?.name || news.source,
    category: news?.sectionName || news?.section_name || "News Api",
    date: news?.webPublicationDate || news?.pub_date || news.publishedAt,
    id: news.id || news._id || news.title,
    link: news.webUrl || news.web_url || news.url,
  }));

  // Check if articles are empty after filtering
  const shouldDisplay =
    filterOptions.source === "" ||
    filterOptions.source === undefined ||
    filterOptions.source === title;

  if (shouldDisplay) {
    if (articleItems.length === 0 && !loading) {
      return <p className="text-center text-gray-500">No news found</p>;
    }
    return (
      <ArticleList title={title} articles={articleItems} loading={loading} />
    );
  }

  return;
};

export default MainContent;
