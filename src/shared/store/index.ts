import { create } from "zustand";
import { TEmployee } from "@/entities/employee";
import { createJSONStorage, persist } from "zustand/middleware";

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

type onlineStore = {
  online: boolean;
  setOnline: (value: boolean) => void;
};

type loadingStore = {
  loading: boolean;
  setLoading: (value: boolean) => void;
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

export const useStoreOnline = create<onlineStore>((set) => ({
  online: true,
  setOnline: (value) => set({ online: value }),
}));

export const useStoreLoading = create<loadingStore>((set) => ({
  loading: false,
  setLoading: (value) => set({ loading: value }),
}));

type themeStore = {
  theme: "light" | "dark";
  toggleTheme: () => void;
};

export const useStoreTheme = create<themeStore>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
