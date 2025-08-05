import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    name: string;
    email: string;
}

const initialState: UserState = {
    name: "",
    email: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<Partial<UserState>>) => {
            state.name = action.payload.name || state.name;
            state.email = action.payload.email || state.email;
        }
    }
})

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;