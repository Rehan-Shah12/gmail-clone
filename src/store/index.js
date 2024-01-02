import { configureStore } from "@reduxjs/toolkit";
import {authUser} from "./thunks/authUser";

export const store = configureStore({
    reducer: {
        auth: authUser()
    },
});

export * from './thunks/authUser'