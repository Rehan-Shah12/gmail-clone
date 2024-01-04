import '../style/Content.css'
import EmailList from "./EmailList";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {useDispatch, useSelector} from "react-redux";
import {getMessageList} from "../store/thunks/authThunk";
import {useEffect, useState} from "react";

const Content = () => {

    const dispatch = useDispatch()
    const tokenResponse = useSelector((state) => (state.auth.tokenObject))
    const nextPageTokenArray = useSelector((state) => state.auth.nexPageToken)
    const copiedArray = [...nextPageTokenArray]
    const [nextPageToken, setNextPageToken] = useState()


    useEffect(() => {
        if (nextPageTokenArray.length > 0) {
            const copiedArray = [...nextPageTokenArray];
            setNextPageToken(copiedArray.pop());
        }
    }, [nextPageTokenArray]);
    const handleNextPageMessages = () => {
        if (nextPageTokenArray.length > 0) {

            const lastToken = nextPageTokenArray[nextPageTokenArray.length - 1];
            console.log("Last Token ", lastToken)
            console.log("NextTokenArray", nextPageTokenArray)
            const type = "next"

            dispatch(getMessageList(tokenResponse, lastToken ,type));
        }
    };

    const handlePreviousPageMessages = () => {
        if (nextPageTokenArray.length > 0) {

            const dup = [...nextPageTokenArray];

            // console.log("first last : ",dup.pop())
            // console.log("second last : ",dup.pop())
            const type = "previous"

            dup.splice(-2,2)
            console.log("DUPPPPPP",dup)


            dispatch(getMessageList(tokenResponse, dup ,type));
        }
    }

    return (

        <div className='Content'>
            <div className='icons'>
                <IoIosArrowBack size={20} onClick={handlePreviousPageMessages}/>
                <IoIosArrowForward size={20} onClick={handleNextPageMessages}/>
            </div>

            <EmailList/>
        </div>
    )
}

export default Content