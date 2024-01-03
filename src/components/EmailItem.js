import "../style/EmailItem.css"

function EmailItem({text, sender}){

    return(
        <div className='EmailItem'>
            <div className='sender-name'><p>{sender}</p></div>
            <div className='snippet'><p>{text}</p></div>
        </div>
    )
}

export default EmailItem