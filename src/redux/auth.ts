import { createSlice } from "@reduxjs/toolkit";

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    token: string
}

const initialState = {
    user: null as User | null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            if (action.payload) {
                state.user = action.payload;
            }
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("token");
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
