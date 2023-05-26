import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getLanguages = createAsyncThunk(
  "translate/getLanguages",
  async () => {
    const options = {
      method: "GET",
      url: "https://text-translator2.p.rapidapi.com/getLanguages",
      headers: {"X-RapidAPI-Key": "f9584f5b9emshf1a494f169c33d7p137511jsn6eff7433d54e",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },

      
    };
    const response= await axios.request(options)
    console.log(response.data.data.languages)
    return response.data.data.languages.map((lang)=>({value:lang.code, label:lang.name}));
  }
);

export const getResponse = createAsyncThunk(
  "translate/getResponse",
  async (props) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set("source_language", props.sourceLang.value);
    encodedParams.set("target_language", props.targetLang.value);
    encodedParams.set("text", props.prompt);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "f9584f5b9emshf1a494f169c33d7p137511jsn6eff7433d54e",
        "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    const res = await axios.request(options);
    console.log(res.data.data.translatedText);
    return res.data.data.translatedText;
  }
);

const initialState = {
  response: "",
  languages: [],
  isLoading: false,
};

export const translateSlice = createSlice({
  name: "translate",
  initialState,
  extraReducers: {
    [getResponse.pending]: (state) => {
      state.isLoading = true;
    },
    [getResponse.fulfilled]: (state, action) => {
      state.response = action.payload;
      state.isLoading = false;
    },
    [getResponse.rejected]: (state) => {
      state.isLoading = false;
    },
    [getLanguages.pending]: (state) => {
      state.isLoading = true;
    },
    [getLanguages.fulfilled]:(state,action)=>{
      state.languages=action.payload;
    },
    [getLanguages.rejected]:(state,action)=>{
      state.isLoading = false;
    },
  },
});

export default translateSlice.reducer;
