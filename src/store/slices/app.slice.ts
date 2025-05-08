import { createSlice } from "@reduxjs/toolkit";

export type LanguageCode = "en" | "vi" | "ko" | "ja" | "cn";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    language: "vi" as LanguageCode,
    isSidebarOpen: false,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const { toggleSidebar, setLanguage } = appSlice.actions;
export const appReducer = appSlice.reducer;
