import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getMessageObject} from "../store/thunks/authThunk";

function EmailItem({text}){



    return(
        <div className='EmailItem'><p>{text}</p></div>
    )
}

export default EmailItem