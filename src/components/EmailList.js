import EmailItem from "./EmailItem";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";


function EmailList(){
    const token = useSelector((state) => state.auth.token)
    const dispatch = useDispatch()
    const stateMessageObjects = useSelector(state => state.auth.messageObjects)
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
                return <EmailItem key={message.id} text={message.snippet} sender={senderValue} />;
            }
            return null;
        });

        console.log(stateMessageObjects)
        setRendered(renderedObjects)
    }, [stateMessageObjects]);




    return(
        // <div className='EmailList'>{renderedObjects}</div>
    <div className='EmailList'>{rendered}</div>


    )
}

export default EmailList