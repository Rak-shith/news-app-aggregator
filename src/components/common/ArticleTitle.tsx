import React from "react";

type Props = {
	title: string;
};

const ArticleTitle = ({ title }: Props) => {
	return (
		<h2 className="text-xl font-bold  border-b my-10 text-blue-800">{title}</h2>
	);
};

export default ArticleTitle;
