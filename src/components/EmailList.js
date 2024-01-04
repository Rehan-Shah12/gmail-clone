import EmailItem from "./EmailItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { setShowEmailContent } from "../store/slices/authSlice";


function EmailList(){
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()
    const stateMessageObjects = useSelector(state => state.auth.messageObjects)
    // console.log("odiwnaondaoindiaondiaonwdioawn", stateMessageObjects)
    const [rendered, setRendered] = useState([])

    function getEmailSender(data) {
        const fromObject = data.find(item => item.name === "From");

        if (fromObject) {
            const value = fromObject.value
            return value.substring(0, value.indexOf('<'))
        } else {

            return "Sender not found";
        }
    }



    useEffect(() => {


        const renderedObjects = stateMessageObjects.map((message) => {

            const senderValue = getEmailSender(message.payload.headers)

            if (message) {
                return <EmailItem key={message.id} text={message.snippet} sender={senderValue} message={message} onClick={() => handleEmailClick(message.id)} />;
            }
            return null;
        });

        // console.log(stateMessageObjects)
        setRendered(renderedObjects)
    }, [stateMessageObjects]);



    const handleEmailClick = (id) => {
        dispatch(setShowEmailContent(id))
        // console.log(id)

    
    };


    return(
        // <div className='EmailList'>{renderedObjects}</div>
    <div className='EmailList' >{rendered}</div>


    )
}

export default EmailList