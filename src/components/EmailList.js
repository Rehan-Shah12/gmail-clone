import EmailItem from "./EmailItem";
import {useDispatch, useSelector} from "react-redux";
import {getMessageObject} from "../store/thunks/authThunk";
import {useEffect, useState} from "react";


function EmailList(){
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()
    const stateMessageObjects = useSelector(state => state.auth.messageObjects)
    const [rendered, setRendered] = useState([])



    useEffect(() => {

        console.log(stateMessageObjects)
        const renderedObjects = stateMessageObjects.map((message) => {

            if (message?.snippet) {
                return <EmailItem key={message.id} text={message.snippet} />;
            }
            return null;
        });

        setRendered(renderedObjects)
    }, []);




    return(
        // <div className='EmailList'>{renderedObjects}</div>
    <div className='EmailList'>{rendered}</div>


    )
}

export default EmailList