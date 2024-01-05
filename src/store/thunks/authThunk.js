import {
    setToken,
    setUser,
    setMessages,
    setMessageObject,
    setNextPageToken,
    resetMessageObjects, setPreviousPageToken
} from "../slices/authSlice";
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

                window.localStorage.setItem("Token", JSON.stringify(tokenResponse))


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


export const getMessageList = (tokenResponse, nextPageToken = "", type, label='INBOX') => async (dispatch) => {
    try {
        console.log()
        console.log("Called",tokenResponse);

        // Reset messageObjects before fetching new messages
        dispatch(resetMessageObjects());

        await axios.get(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages?labelIds=${label}`,
            {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                    Accept: 'application/json',
                },
                params: {
                    maxResults: 5,
                    pageToken: nextPageToken || '',
                },
            }
        ).then(async (response) => {
            await dispatch(setMessages(response.data));
            const messages = response.data.messages;
            console.log("Get Message List:", response.data);

            if(type === 'previous'){
                dispatch(setPreviousPageToken())
                console.log("PREVIOUS ")
            }
            else{
                dispatch(setNextPageToken(response.data.nextPageToken));
                console.log("NEXT")
            }


            messages.map((message) => {
                dispatch(getMessageObject(tokenResponse.access_token, message.id));
            });
        }).catch((err) => console.log(err));
    } catch (error) {
        console.log("Fetching Message List Failed", error);
    }
};

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

export const sendEmail = (token, recipient, subject, body,from) => async (dispatch) => {
    try {
        const requestBody = {
            raw: window.btoa(
                `From: ${from.given_name}\r\nTo: ${recipient}\r\nSubject: ${subject}\r\n\r\n${body}`
            ),
        };

        await axios.post(
            `https://gmail.googleapis.com/gmail/v1/users/me/messages/send`,
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

    } catch (error) {
        console.log("Sending Email Failed", error);
    }
};
