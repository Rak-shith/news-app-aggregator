import { create } from "zustand";

export const useStore = create((set) => ({
  filterOptions: {
    date: "",
    category: "",
    source: "",
    searchKeyword: "",
  },
  setFilterOptions: (val: {
    date?: string;
    category?: string;
    source?: string;
    searchKeyword?: string;
  }) =>
    set(() => ({
      filterOptions: {
        ...val,
      },
    })),

  filters: {
    date: "",
    category: "",
    source: "",
    searchKeyword: "",
  },
  setFilters: (val: {
    date?: string;
    category?: string;
    source?: string;
    searchKeyword?: string;
  }) =>
    set(() => ({
      filters: {
        ...val,
      },
    })),
}));
