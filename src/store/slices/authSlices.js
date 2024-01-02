import {createSlice} from "@reduxjs/toolkit";
import {authUser} from "../thunks/authUser";

const authSlices = createSlice({
    name: "auth",
    initialState: {
        isLoading: false,
        data: [],
        error: null
    },
    extraReducers(builder){
        builder.addCase(authUser.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(authUser.fulfilled, (state, action) => {
            state.isLoading = false
            // state.data = action.payload
            state.error = null
        });
        builder.addCase(authUser.rejected, (state,action) => {
            state.isLoading= false
            state.error = action.error
        })
    }
})

export const authReducer = authSlices.reducer