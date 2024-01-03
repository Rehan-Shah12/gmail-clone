import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {Provider} from "react-redux";
import store from "./store/index";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" ;
import EmailContent from "./components/EmailContent";

const root = ReactDOM.createRoot(document.getElementById('root'));
// added commit
root.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <Router>
                <Routes>
                    <Route path="/home"  element={<App />} />
                    <Route path="/home/email" element={<App><EmailContent/></App>}/>
                    <Route path="/"  index element={<Login />} />
                </Routes>
            </Router>
    </GoogleOAuthProvider></Provider>

);