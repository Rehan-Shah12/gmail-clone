import "../style/Compose.css"
import {useState} from "react";
import { RxCross1 } from "react-icons/rx";
import {sendEmail} from "../store/thunks/authThunk";
import {useDispatch, useSelector} from "react-redux";

function Compose({onClick}){
    const [email, setEmail] = useState()
    const [subject, setSubject] = useState()
    const [textArea, setTextArea] = useState()
    const dispatch = useDispatch()
    const token = useSelector((state) => (state.auth.token))
    const from = useSelector((state) => (state.auth.user))




    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(sendEmail(token, email, subject, textArea, from));

        console.log(`Email: ${email}, Subject: ${subject}, TextArea: ${textArea}`);
        console.log("Submitted");
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleSubjectChange = (event) => {
        setSubject(event.target.value)
    }

    const handleTextAreaChange = (event) => {
        setTextArea(event.target.value)

    }

    return(
        <div className='Compose'>
            <header><div>New Message</div><div onClick={onClick} className='cross-icon'><RxCross1 size={20}/></div></header>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <input type='email' placeholder='Recipent' className="compose-input" onChange={handleEmailChange}/>
                    </div>
                    <div>
                        <input placeholder='Subject' className="compose-input" onChange={handleSubjectChange}/>
                    </div>
                    <div>
                        <textarea className='textarea' onChange={handleTextAreaChange}/>
                    </div>
                </div>
                <button className='Compose-Button' >Send</button>
            </form>
        </div>
    )
}

export default Compose