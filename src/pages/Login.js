import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import {authenticateUser, getMessageList} from "../store/thunks/authThunk";
import { useNavigate } from 'react-router-dom';

function Login() {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user)
    const [tokenResponse, setTokenResponse] = useState();
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setTokenResponse(codeResponse);
            // console.log(codeResponse)

        },
        onError: (error) => console.log('Login Failed:', error),
        scope: 'https://www.googleapis.com/auth/gmail.readonly',
    });

    useEffect(() => {
        if (tokenResponse) {
            dispatch(authenticateUser(tokenResponse))
            dispatch(getMessageList(tokenResponse))
        }
    }, [tokenResponse, dispatch]);

    useEffect(() => {
        if(user){
            console.log("Redirecting to App.js")
            navigate("/home")
        }
    }, [user])


    return (
        <div>
            <button onClick={login}>Sign in with Google</button>
        </div>
    );
}

export default Login;
