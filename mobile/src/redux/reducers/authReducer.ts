import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../@types/Auth";

export const authReducer = createSlice({
    name: 'auth',
    initialState: {
        user: { id: 0, name: '', email: '', token: '' } as User
    },
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        },
        setClearUser: (state) => {
            state.user = { id: 0, name: '', email: '', token: '' }
        }
    }
})

export const { setUser, setClearUser } = authReducer.actions

export default authReducer.reducer
