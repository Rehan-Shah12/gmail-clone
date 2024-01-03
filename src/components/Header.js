import { MdOutlineMenu, MdOutlineSearch } from "react-icons/md";
import { BiAbacus } from "react-icons/bi";
import { IoSettingsOutline, IoHelpCircleOutline } from "react-icons/io5";
import { TbGridDots } from "react-icons/tb";
import '../style/Header.css'
import {useSelector} from "react-redux";

const Header = () => {

    const user = useSelector((state) => state.auth.user)

    return (
        <div className='header'>
            <div className='header-left'>
                <MdOutlineMenu  size={25} color='black'  className='icons'/>
                <img className="gmail-logo" src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"  alt="" aria-hidden="true" role="presentation" />

            </div>
            <div className="header-middle">
                <MdOutlineSearch size={30}  className='icons'/>
                <input placeholder='Search in mail ' />
                <BiAbacus size={30} className='icons'/>

            </div>
            <div className='header-right'>
                <div >
                <IoSettingsOutline size={25}/>
                <IoHelpCircleOutline size={25} />
                <TbGridDots size={25} />
                </div>
                <div>
                    <img src={user.picture} alt='profile' className='profile-picture'/>
                </div>
            </div>

        </div>
    )
}

export default Header
