// services/newsService.ts
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../utils";
import { GuardianResponse, NewsApiResponse, NytAPiResponse } from "../types";
import { useStore } from "../store";

const newsApiBaseURL =
	"https://newsapi.org/v2/top-headlines?pageSize=10&language=en&";
const guardianApiBaseURL = "https://content.guardianapis.com/search?";
const nytApiBaseURL =
	"https://api.nytimes.com/svc/search/v2/articlesearch.json?";

export const useNewsArticles = () => {
	const { filterOptions } = useStore<any>((state) => state);
	const searchWord = filterOptions?.searchKeyword;
	const category = filterOptions?.category;
	const date = filterOptions?.date;
	const source = filterOptions?.source;

	const { data: newsApi, isLoading: newsApiLoading } = useQuery({
		queryFn: async () => {
			let endpoint = newsApiBaseURL;
			if (date)
				endpoint += `to=${new Date(date).toISOString().split("T")[0]}&from=${
					new Date(date).toISOString().split("T")[0]
				}&`;
			if (searchWord) endpoint += `q=${searchWord}&`;
			if (category) endpoint += `category=${category}&`;
			const { data } = await axiosInstance.get<NewsApiResponse>(
				`${endpoint}apiKey=20013f61afdd483f99f19c42c8b1d594`
			);
			return data;
		},
		queryKey: ["news", { searchWord, category, date, source }],
	});
	const { data: guardianApi, isLoading: guardianApiLoading } = useQuery({
		queryFn: async () => {
			let endpoint = guardianApiBaseURL;
			if (searchWord) endpoint += `q=${searchWord}&`;
			if (category) endpoint += `tag=${category}&`;
			if (date)
				endpoint += `from-date=${
					new Date(date).toISOString().split("T")[0]
				}&to-date=${new Date(date).toISOString().split("T")[0]}&`;
			const { data } = await axiosInstance.get<{ response: GuardianResponse }>(
				`${endpoint}api-key=edb46622-6926-4fc3-a8fd-7a0c6aaae5c9`
			);
			return data.response;
		},
		queryKey: ["guardian", { searchWord, category, date, source }],
	});
	const { data: nytApi, isLoading: nytApiLoading } = useQuery({
		queryFn: async () => {
			let params: {
				q?: string;
				fq?: string;
				"api-key": string;
				pub_date?: string;
			} = {
				q: searchWord,
				"api-key": "Dlsjs58RAjo5IzHhnUiGAbXl29WNJIj0",
				pub_date: new Date().toISOString().split("T")[0],
			};
			if (category) {
				params.fq = `section_name:${category}`;
			}
			if (searchWord) {
				params.q = searchWord;
			}
			if (date) {
				params.pub_date = new Date(date).toISOString().split("T")[0];
			}

			let endpoint = nytApiBaseURL;
			const { data } = await axiosInstance.get<NytAPiResponse>(endpoint, {
				params,
			});
			return data?.response;
		},
		queryKey: ["nyt", { searchWord, category, date, source }],
	});

	return {
		newsApiNews: newsApi?.articles ?? [],
		newsApiLoading,
		guardianApiNews: guardianApi?.results ?? [],
		guardianApiLoading,
		nytApiNews: nytApi?.docs ?? [],
		nytApiLoading,
	};
};
