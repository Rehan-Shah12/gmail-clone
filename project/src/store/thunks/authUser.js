import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authUser = createAsyncThunk("auth/user", async (tokenResponse) => {
    const response =  await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
        headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
            Accept: 'application/json',
        },
    })
        .then((res) => {
            console.log("Response Data", response.data)
        })
        .catch((err) => console.log(err));
})

export {authUser}
