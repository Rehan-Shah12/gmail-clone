import React from 'react';
import Content from "./components/Content";
import './App.css'
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {



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

            </div>
        </div>

    );
}

export default App;
