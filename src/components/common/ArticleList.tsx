import React from "react";
import ArticleTitle from "./ArticleTitle";

type Article = {
	title: string;
	image: string;
	source: string;
	category: string;
	date: string;
	id: string;
	link: string;
};

type ArticleProps = {
	article: Article;
};

const ArticleItem = ({ article }: ArticleProps) => {
	return (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden border">
			{/* Article Image */}
			{article.image ? (
				<img
					src={article.image}
					alt={article.title}
					className="w-full h-48 object-cover"
				/>
			) : (
				<div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600">
					No Image
				</div>
			)}

			{/* Article Content */}
			<div className="p-4">
				<h3 className="text-lg font-bold mb-2">{article.title}</h3>
				<p className="text-sm text-gray-600 mb-3">
					{article.category && (
						<>
							<strong>Category:</strong> {article.category} |{" "}
						</>
					)}
					{article.source && (
						<>
							<strong>Source:</strong> {article.source} |{" "}
						</>
					)}
					{article.date && (
						<>
							<strong>Date:</strong> {new Date(article.date).toLocaleDateString()} |{" "}
						</>
					)}
				</p>
				{article.link && (
					<a
						className="text-blue-500 font-semibold italic"
						rel="noreferrer"
						target="_blank"
						href={article.link}
					>
						View Story
					</a>
				)}
			</div>
		</div>
	);
};

type ArticleListProps = {
	title: string;
	articles: Article[];
	loading: boolean;
};

const ArticleList = ({ title, articles, loading }: ArticleListProps) => {
	return (
		<div className="flex-1 p-4">
			<ArticleTitle title={title} />
			{loading ? (
				<p className="text-center text-gray-500">Loading...</p>
			) : articles.length === 0 ? (
				<p className="text-center text-gray-500">No News Available</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{articles.map((article) => (
						<ArticleItem key={article.id} article={article} />
					))}
				</div>
			)}
		</div>
	);
};

export default ArticleList;
