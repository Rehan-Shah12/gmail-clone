import { useDispatch } from "react-redux"
import "../style/EmailItem.css"

function EmailItem({text, sender, onClick}){



    return(
        <div className='EmailItem' onClick={onClick}>
            <div className='sender-name'><p>{sender}</p></div>
            <div className='snippet'><p>{text}</p></div>
        </div>
    )
}

export default EmailItem