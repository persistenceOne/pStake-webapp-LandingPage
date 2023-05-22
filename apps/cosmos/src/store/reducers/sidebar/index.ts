import { createSlice } from "@reduxjs/toolkit";
import { SidebarState } from "./types";

const initialState: SidebarState = {
  show: false
};
const mobileSidebar = createSlice({
  name: "MobileSidebar",
  initialState,
  reducers: {
    showMobileSidebar: (state) => {
      state.show = true;
    },
    hideMobileSidebar: (state) => {
      state.show = false;
    }
  }
});

export const { showMobileSidebar, hideMobileSidebar } = mobileSidebar.actions;

export default mobileSidebar.reducer;
