import {setToken, setUser, setMessages, setMessageObject} from "../slices/authSlice";
import axios from "axios";


export const authenticateUser = (tokenResponse) => async(dispatch) => {
    try {
        await axios
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                    Accept: 'application/json',
                },
            })
            .then(async (response) => {


                console.log("Access Token ", tokenResponse.access_token)
                console.log("Authenticate User: ", response.data)
                await dispatch(setToken(tokenResponse.access_token))
                await dispatch(setUser(response.data))

            })
            .catch((err) => console.log(err));
    }
    catch (error){
        console.log("Authentication Failed", error)
    }
}

export const getMessageList = (tokenResponse) => async(dispatch) => {
    try{
        await axios.get(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages`,
            {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                    Accept: 'application/json',
                },
                params: {
                    maxResults: 5,
                },
            }
        ).then(async(response) => {
            // console.log("Fetching Messages response", response.data)
            await dispatch(setMessages(response.data))
            const messages = response.data.messages

            messages.map((message) => {dispatch(getMessageObject(tokenResponse.access_token, message.id))})

        }).catch((err) => console.log(err));
    }
    catch (error){
        console.log("Fetching Message List Failed", error)
    }
}


export const getMessageObject = (token, id) => async (dispatch) => {
    try {
       await axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        }).then(async(response) => {
            await dispatch(setMessageObject(response.data))
           // console.log(response.data)
       })
    }
    catch (error){
        console.log("Fetching Message List Failed", error)
    }
}
