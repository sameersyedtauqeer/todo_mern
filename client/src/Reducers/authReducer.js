import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetch2 } from "../helpers/fetch2"

const initialState = {
    token: '',
    loading: false,
    error: ""
}




export const signupuser = createAsyncThunk(
    "signupuser",
    async (body) => {
        const result = await fetch2("/signup", body)
        return result
    }
)

export const signinuser = createAsyncThunk(
    "signinuser",
    async (body) => {
        const result = await fetch2("/signin", body)
        return result
    }
)

const authReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.token = localStorage.getItem("token")

        },
        logout: (state, action) => {
            state.token = null
            state.token = localStorage.removeItem("token")

        },
    },
    extraReducers: {
        [signupuser.fulfilled]: (state, { payload: { error, message } }) => {
            state.loading = false
            if (error) {
                state.error = error
            }
            else {
                state.error = message
            }
        },

        [signupuser.pending]: (state, action) => {
            state.loading = true
        },

        [signinuser.pending]: (state, action) => {
            state.loading = true
        },

        [signinuser.fulfilled]: (state, { payload: { error, token } }) => {
            state.loading = false
            if (error) {
                state.error = error
            }
            else {
                state.token = token
                localStorage.setItem("token", token)
            }
        },
    }
})

export const { addToken , logout} = authReducer.actions

export default authReducer.reducer