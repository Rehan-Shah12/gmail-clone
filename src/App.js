import React, {useState} from 'react';
import Content from "./components/Content";
import './App.css'
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import {useGoogleLogin} from "@react-oauth/google";
import {useDispatch} from "react-redux";
import {authUser} from "./store";

function App() {
    const [tokenResponse, setTokenResponse] = useState()

    const dispatch = useDispatch()

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setTokenResponse(codeResponse)
            dispatch(authUser({tokenResponse}))
        },
        onError: (error) => console.log('Login Failed:', error),
        scope: 'https://www.googleapis.com/auth/gmail.readonly',
    });



    return (
        <div className='App'>
            <div className='grid-container'>
                <div >
                    <Header/>
                </div>
                <div className='App-Body'>
                    <div className='App-Body-Sidebar'>
                        <Sidebar/>
                    </div>
                    <div className='App-Body-Content'>
                        <Content/>
                    </div>
                </div>

                <button onClick={login}>Sign in with Google</button>

            </div>
        </div>

    );
}

export default App;
