import React, {useEffect, useState} from 'react';
import '../style/Sidebar.css';
import { RiPencilLine } from "react-icons/ri";
import { IoMailUnread } from "react-icons/io5";
import { MdInbox, MdLabelImportantOutline } from "react-icons/md";
import Compose from "./Compose";
import {useDispatch, useSelector} from "react-redux";
import {getMessageList} from "../store/thunks/authThunk";

const Sidebar = () => {
    const [isComposeOpen, setComposeOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState('INBOX');
    let tokenResponse = useSelector((state) => (state.auth.tokenObject))
    const dispatch = useDispatch()

    const handleComposeOpening = () => {
        setComposeOpen(!isComposeOpen);
    };

    useEffect(() => {

        if(tokenResponse === null){
            const parsedToken =  window.localStorage.getItem("Token")
            tokenResponse = JSON.parse(parsedToken)
        }
        dispatch(getMessageList(tokenResponse,"","",selectedLabel))


        console.log("LABEL CHANGED", selectedLabel)
    }, [selectedLabel]);

    const handleLabelClick = (label) => {
        setSelectedLabel(label);
    };
    console.log("LABELLL",selectedLabel)

    return (
        <div className='SideBar'>
            <div onClick={handleComposeOpening}>
                <button className='compose-button'>
                    <RiPencilLine size={25} className='compose-icon' />
                    Compose
                </button>
            </div>

            {isComposeOpen && <Compose onClick={handleComposeOpening}/>}

            <div className='sidebar-list'>
                <ul className='options-list'>
                    <li className={`list ${selectedLabel === 'INBOX' ? 'selected' : ''}`} onClick={() => handleLabelClick('INBOX')}>
                    <MdInbox size={20} className='list-icons' /> Inbox
                    </li>
                    <li className={`list ${selectedLabel === 'UNREAD' ? 'selected' : ''}`} onClick={() => handleLabelClick('UNREAD')}>
                        <IoMailUnread size={20} className='list-icons' /> Unread
                    </li>
                    <li className={`list ${selectedLabel === 'SENT' ? 'selected' : ''}`} onClick={() => handleLabelClick('SENT')}>
                        <MdLabelImportantOutline size={20} className='list-icons' /> Sent
                    </li>

                </ul>

            </div>
        </div>
    );
};

export default Sidebar;
