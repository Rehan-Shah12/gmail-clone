import '../style/Sidebar.css'
import { RiPencilLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { MdInbox, MdLabelImportantOutline } from "react-icons/md";

const Sidebar = () => {
    return (
        <div className='SideBar'>
            <div><button className='compose-button'><RiPencilLine size={25} className='compose-icon'/>Compose</button></div>
            <div className='sidebar-list'>
                <ul className='options-list'>
                    <li className='list-active'><MdInbox size={20} className='list-icons'/> Inbox</li>
                    <li><FaRegStar size={20} className='list-icons'/> Starred</li>
                    <li> <MdLabelImportantOutline size={20} className='list-icons'/>Important</li>
                </ul>
            </div>


        </div>


    )
}

export default Sidebar