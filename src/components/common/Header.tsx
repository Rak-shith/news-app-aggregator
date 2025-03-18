import React, { useState } from "react";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useStore } from "../../store";
import { guardianSections, newsApiSections, nytApiSections } from "../../data";

const Header: React.FC = () => {
	const { filters, setFilters, setFilterOptions } = useStore<any>(
		(state) => state
	);

	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const toggleFilter = () => {
		setIsFilterOpen(!isFilterOpen);
	};

	const handleFilterChange = () => {
		setFilterOptions(filters);
	};

	return (
		<header className="bg-blue-500 text-white p-4">
			<div className="container mx-auto flex flex-col md:flex-row md:justify-between">
				<div>
					<h1 className="text-2xl text-center font-bold mb-4 md:mb-0">
						News Aggregator
					</h1>
				</div>
				<div className="flex items-center gap-x-3 justify-between">
					<div className="relative flex-1">
						<input
							value={filters.searchKeyword}
							type="text"
							placeholder="Search articles..."
							className="p-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring text-black text-xs w-full"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								setFilters({ ...filters, searchKeyword: e.target.value })
							}
						/>
						<button
							onClick={handleFilterChange}
							className="flex justify-center bg-blue-700 rounded-r-md items-center absolute right-0 top-1/2 transform -translate-y-1/2 text-white h-full w-8"
						>
							<MagnifyingGlassIcon className="h-5 w-5" />
						</button>
					</div>
					<div className="relative">
						<button className="border p-2 rounded" onClick={toggleFilter}>
							<FunnelIcon className="w-5 h-5" />
						</button>
						{isFilterOpen && (
							<FilterOptions
								filters={filters}
								setFilters={setFilters}
								handleFilterChange={handleFilterChange}
							/>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

const FilterOptions: React.FC<{
	filters: any;
	setFilters: React.Dispatch<React.SetStateAction<any>>;
	handleFilterChange: () => void;
}> = ({ filters, setFilters, handleFilterChange }) => {
	const sectionOptions =
		filters.source === "newsApi"
			? newsApiSections
			: filters.source === "guardian"
			? guardianSections
			: nytApiSections;

	return (
		<div className="bg-slate-100 w-[150px] absolute top-10 right-0 shadow flex flex-col rounded py-2 pb-1 text-xs">
			<div className="text-black border-b px-2 py-2 w-full hover:bg-white ">
				<input
					placeholder="Select date"
					type="date"
					className="w-full bg-transparent"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setFilters({ ...filters, date: e.target.value })
					}
					value={filters.date || ""}
				/>
			</div>
			<div className="text-black border-b px-2 py-2 w-full hover:bg-white">
				<select
					defaultValue=""
					value={filters.source || ""}
					className="w-full bg-transparent"
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
						setFilters({ ...filters, source: e.target.value })
					}
				>
					<option value="">Select source</option>
					<option value="newsApi">News Api</option>
					<option value="guardian">The Guardian</option>
					<option value="newYork">The New York Times</option>
				</select>
			</div>
			<div className="text-black border-b px-2 py-2 w-full hover:bg-white">
				<select
					defaultValue=""
					className="w-full bg-transparent"
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
						setFilters({ ...filters, category: e.target.value })
					}
				>
					{filters?.source !== "" && <option value="">Select Section</option>}
					{filters.source === "" ? (
						<option value="">All</option>
					) : (
						sectionOptions?.map((sections) => (
							<option key={sections.id} value={sections.id}>
								{sections.title}
							</option>
						))
					)}
				</select>
			</div>
			<div className="m-2">
				<button
					onClick={handleFilterChange}
					className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
				>
					Apply Filters
				</button>
			</div>
			{Object.values(filters).length && (
				<button
					onClick={() => setFilters({})}
					className="w-full py-2 px-4 rounded-md text-blue-600"
				>
					Clear
				</button>
			)}
		</div>
	);
};

export default Header;
