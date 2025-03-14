import { create } from "zustand";
import { TEmployee } from "@/entities/employee";

type groupStore = {
  selectedDepartment: string;
  setSelectedDepartment: (tag: string) => void;
};

type searchStore = {
  employees: TEmployee[];
  searchQuery: string;
  setEmployees: (employees: TEmployee[]) => void;
  setSearchQuery: (query: string) => void;
};

type sortStore = {
  sortByAlphabet: boolean;
  setSortByAlphabet: (value: boolean) => void;
  sortByBirthday: boolean;
  setSortByBirthday: (value: boolean) => void;
};

export const useStoreGroup = create<groupStore>()((set) => ({
  selectedDepartment: "",
  setSelectedDepartment: (tag) => {
    set({ selectedDepartment: tag });
  },
}));

export const useStoreSearch = create<searchStore>((set) => ({
  employees: [],
  searchQuery: "",
  setEmployees: (employees) => set({ employees }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export const useStoreSort = create<sortStore>((set) => ({
  sortByAlphabet: false,
  sortByBirthday: false,
  setSortByAlphabet: (value) => set({ sortByAlphabet: value }),
  setSortByBirthday: (value) => set({ sortByBirthday: value }),
}));
