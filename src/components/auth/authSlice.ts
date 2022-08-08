import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Storage from "../../services/storage";

import { User } from "./type";

// Define a type for the slice state
interface AuthState {
  user: User | null;
  isLogining: boolean;
}

interface ILogin {
  email: string;
  password: string;
  remember: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
  isLogining: false,
};

export const login = createAsyncThunk("/auth/login", async (data: ILogin) => {
  return await axios.post("/auth/login", data).then((res) => res.data);
});

export const loginWithToken = createAsyncThunk(
  "/auth/access_token",
  async (accessToken: string) => {
    return await axios
      .post("/auth/access_token", { access_token: accessToken })
      .then((res) => res.data);
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      Storage.remove("access_token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLogining = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.isLogining = false;

      if (!action.payload) return;

      if (action.payload.code === 200) {
        state.user = action.payload.user;
        Storage.set("access_token", action.payload.access_token);
      }
    });

    builder.addCase(login.rejected, (state) => {
      state.isLogining = false;
    })

    builder.addCase(loginWithToken.fulfilled, (state, action) => {
      if (!action.payload) return;

      if (action.payload.code === 200) {
        state.user = action.payload.user;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions;

export default authSlice.reducer;
