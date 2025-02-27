import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    // image: "",
    accessToken: "",
    email: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            // state.image = action.payload.image;
            state.accessToken = action.payload.accessToken;
            state.email = action.payload.email;
        },
        clearUser: (state) => {
            state.username = "";
            // state.image = "";
            state.token = "";
            state.email = "";
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
