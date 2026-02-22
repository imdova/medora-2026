import { type StateCreator } from "zustand";

export type UiState = {
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";
};

export type UiActions = {
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setTheme: (theme: UiState["theme"]) => void;
};

export type UiSlice = UiState & UiActions;

const initialState: UiState = {
  sidebarOpen: true,
  theme: "system",
};

export const createUiSlice: StateCreator<UiSlice, [], [], UiSlice> = (set) => ({
  ...initialState,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setTheme: (theme) => set({ theme }),
});
