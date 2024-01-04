import React, { useState } from 'react';
import '../style/Sidebar.css';
import { RiPencilLine } from "react-icons/ri";
import { IoMailUnread } from "react-icons/io5";
import { MdInbox, MdLabelImportantOutline } from "react-icons/md";
import Compose from "./Compose";

const Sidebar = () => {
    const [isComposeOpen, setComposeOpen] = useState(false);

    const handleComposeOpening = () => {
        setComposeOpen(!isComposeOpen);
    };

    return (
        <div className='SideBar'>
            <div onClick={handleComposeOpening}>
                <button className='compose-button'>
                    <RiPencilLine size={25} className='compose-icon' />
                    Compose
                </button>
            </div>

            {isComposeOpen && <Compose />}

            <div className='sidebar-list'>
                <ul className='options-list'>
                    <li className='list-active'><MdInbox size={20} className='list-icons' /> Inbox</li>
                    <li><IoMailUnread size={20} className='list-icons' /> Unread</li>
                    <li> <MdLabelImportantOutline size={20} className='list-icons' />Important</li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
