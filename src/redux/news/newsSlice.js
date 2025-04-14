import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getNewsList = createAsyncThunk("news/getNewsList", async () => {
  const response = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=uk&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  return response.data;
});

const newsSlice = createSlice({
  name: "news",
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNewsList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getNewsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news";
      });
  },
});

export default newsSlice.reducer;
