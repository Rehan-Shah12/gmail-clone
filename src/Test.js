import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function Test() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState([]);
    const [messagesIds, setMessagesIds] = useState([]);
    const [emails, setEmails] = useState([]);
    const [decoded, setDecoded] = useState('')

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => console.log("CodeResponse", codeResponse),
        onError: (error) => console.log('Login Failed:', error),
        scope: 'https://www.googleapis.com/auth/gmail.readonly',
    });

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json',
                    },
                })
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    useEffect(() => {


        // to fetch the Emails id List and store them in array
        const fetchEmailList = async () => {
            if (profile.id) {
                try {
                    const response = await axios.get(
                        `https://gmail.googleapis.com/gmail/v1/users/me/messages`,
                        {
                            headers: {
                                Authorization: `Bearer ${user.access_token}`,
                                Accept: 'application/json',
                            },
                            params: {
                                maxResults: 5,
                            },
                        }
                    );

                    const emailBody = response.data.messages
                    console.log("Email Body", emailBody)

                    const ids = emailBody.map((message) => message.id)
                    // console.log(ids)
                    setMessagesIds(ids)
                    // console.log("Message IDs: ", messagesIds)


                } catch (error) {
                    console.log('Error fetching email content: ', error);
                }

            }
        };

        fetchEmailList();
    }, [user, profile]);

    // useEffect(() => {
    //     console.log("Message IDs: ", messagesIds)
    // }, [messagesIds]);

    useEffect(() => {


        const fetchMessages = async (id) => {
            const response = await axios.get(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`,{
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json',
                }
            })

            // console.log("Response", response.data)

            const wholeEmail = response.data;

            setEmails((prevState) => [...prevState, wholeEmail]);
        }

        if(messagesIds.length > 0){
            messagesIds.map((id) => fetchMessages(id))

        }



    }, [messagesIds]);

    useEffect(() => {
        console.log("Emails", emails)
    }, [emails]);

    function renderContent(){
        return (
            <div>
                {emails.map((email, index) => (
                    <p key={index} onClick={() => openMessage(email)}>{email.snippet}</p>
                ))}
            </div>
        );

    }

    function openMessage(email){
        const BodySize = email.payload.body?.size;
        console.log("BodySize:", BodySize)
        console.log("BodySize Email:", email)


        if(BodySize > 0) {
            const bodyContent = email.payload.body?.data;
            const decodedBody = atob( bodyContent.replace(/-/g, '+').replace(/_/g, '/') );

            console.log('Email Content: ', BodySize);
            console.log('Email Content: ', email.payload);

            setDecoded(decodedBody)


        }
        else {

            if(email.payload.parts.body.size === 0){
                console.log("first condition")
                console.log("BodyContent", email.payload.parts[0].parts[0].parts[1].body.data)
                const bodyContent = email.payload.parts[0].parts[0].parts[1].body.data

                const decodedBody = atob( bodyContent.replace(/-/g, '+').replace(/_/g, '/') );

                console.log('Data: ', email.payload.parts[0].parts[1]);
                console.log('Email Content: ', email.payload);

                setDecoded(decodedBody)

            }
            else if(email.payload.parts[1].body.size > 0){
                console.log("second condition")
                console.log("second condition data: ", email.payload.parts[1]?.body.data)
                const bodyContent = email.payload.parts[1]?.body?.data

                const decodedBody = atob( bodyContent.replace(/-/g, '+').replace(/_/g, '/') );

                // console.log('Data: ', email.payload.parts[0].parts[1]);
                console.log('Email Content: ', email.payload);

                setDecoded(decodedBody)

            }

        }

    }



    const logOut = () => {
        googleLogout();
        setProfile([]);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile.length !== 0 ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}

            <div>{renderContent()}</div>
            <div>{<div
                dangerouslySetInnerHTML={{__html: decoded}}
            />}</div>
        </div>
    );
}

// export default Test;
