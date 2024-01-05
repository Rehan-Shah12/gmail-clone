import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
        name: 'auth',
        initialState: {
            tokenObject: null,
            token: null,
            user: null,
            messages: [],
            messageObjects: [],
            showEmailContent: false,
            activeEmail: '',
            nexPageToken: [],
            label: ''
        },
        reducers: {
            setTokenObject: (state,action) => {
                state.tokenObject = action.payload
            },
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
            },
            setShowEmailContent: (state,action) => {
                state.showEmailContent = !(state.showEmailContent)
                state.activeEmail = action.payload
            },
            setNextPageToken: (state, action) => {
                state.nexPageToken.push(action.payload)
            },
            setPreviousPageToken: (state) => {
                state.nexPageToken.splice(-2, state.nexPageToken.length - 2)
            },
            resetMessageObjects: (state) => {
                state.messageObjects = [];
            },
            setLabel: (state,action) => {
                state.label = action.payload
            }
        }
})

export const {setToken, setUser, setMessages, setMessageObject, setShowEmailContent,setNextPageToken, setTokenObject, resetMessageObjects, setPreviousPageToken} = authSlice.actions
export default authSlice.reducer