import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import {authenticateUser, getMessageList} from "../store/thunks/authThunk";
import { useNavigate } from 'react-router-dom';
import '../style/Login.css'
import {setNextPageToken, setTokenObject} from "../store/slices/authSlice";

function Login() {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.auth.user)
    const [tokenResponse, setTokenResponse] = useState();
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setTokenResponse(codeResponse);
            dispatch(setTokenObject(codeResponse))


        },
        onError: (error) => console.log('Login Failed:', error),
        scope: 'https://www.googleapis.com/auth/gmail.readonly',
    });

    useEffect(() => {
        console.log("Login Response: ",tokenResponse)
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
    }, [user, tokenResponse])


    return (
        <div className='Login'>
            <div><h1>Welcome to Gmail</h1></div>
            
            <div><button onClick={login}>Enter Gmail✌</button></div>
            
        </div>
    );
}

export default Login;
