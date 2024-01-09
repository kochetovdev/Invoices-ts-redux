import { createSlice } from "@reduxjs/toolkit";
import { getUserDataAuth } from "../../localStorage/userData";

const userData = getUserDataAuth();

interface StateOption {
  email: string;
  token: string;
  id: string;
}

const initialState: StateOption = {
  email: userData?.email || "",
  token: userData?.token || "",
  id: userData?.id || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.email = payload.email;
      state.token = payload.token;
      state.id = payload.id;
    },
    removeUser: (state) => {
      state.email = "";
      state.token = "";
      state.id = "";
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
