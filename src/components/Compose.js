import "../style/Compose.css"

function Compose(){
    console.log("Compose Hit")
    return(
        <div className='Compose'>
            <div><input type='email'/></div>
            <div><input/></div>
            <div><textarea/></div>


        </div>
    )
}

export default Compose