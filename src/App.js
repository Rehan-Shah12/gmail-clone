import React, { useEffect } from 'react';
import Content from "./components/Content";
import './App.css'
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { useSelector } from 'react-redux';
import EmailContent from './components/EmailContent';

function App() {

    const showEmailContent = useSelector((state) => state.auth.showEmailContent)

    // useEffect(() => {
    //     console.log(showEmailContent)
    // }, [showEmailContent])
    


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
            {showEmailContent ? <EmailContent/> : <Content />}
          </div>
                </div>

            </div>
        </div>

    );
}

export default App;
