import { create } from "zustand";
import { createUiSlice, type UiSlice } from "./slices/ui-slice";

/**
 * Root store using slice pattern.
 * Add new slices and combine here. Selectors avoid unnecessary re-renders.
 */
export const useStore = create<UiSlice>()((...a) => ({
  ...createUiSlice(...a),
}));

// Selectors (use in components to subscribe only to needed state)
export const useSidebarOpen = () => useStore((s) => s.sidebarOpen);
export const useToggleSidebar = () => useStore((s) => s.toggleSidebar);
export const useTheme = () => useStore((s) => s.theme);
export const useSetTheme = () => useStore((s) => s.setTheme);
