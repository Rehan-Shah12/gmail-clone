import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
        name: 'auth',
        initialState: {
            token: null,
            user: null,
            messages: [],
            messageObjects: []
        },
        reducers: {
            setToken: (state,action) => {
                state.token = action.payload
            },
            setUser: (state,action) => {
                state.user = action.payload
            },
            setMessages: (state,action) => {
                state.messages = action.payload
            },
            setMessageObject: (state, action) => {
                state.messageObjects.push(action.payload)


            }
        }
})

export const {setToken, setUser, setMessages, setMessageObject} = authSlice.actions
export default authSlice.reducer