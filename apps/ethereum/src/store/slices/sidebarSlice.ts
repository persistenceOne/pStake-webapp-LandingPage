import { StateCreator } from "zustand";

export interface SidebarSliceState {
  show: boolean;
}

export interface SidebarSliceActions {
  handleSidebar: (value: boolean) => void;
}

export type SidebarSlice = SidebarSliceState & SidebarSliceActions;

const initialState = {
  show: false,
};
export const createSidebarSlice: StateCreator<SidebarSlice> = (set) => ({
  ...initialState,
  handleSidebar: async (value: boolean) => {
    set({
      show: value,
    });
  },
});
