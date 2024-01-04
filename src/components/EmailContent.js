import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { setShowEmailContent } from "../store/slices/authSlice";
import React, { useState, useEffect } from "react";
import "../style/EmailContent.css"

function EmailContent() {
    const dispatch = useDispatch();
    const activeEmail = useSelector((state) => state.auth.activeEmail);
    const messageObjects = useSelector((state) => state.auth.messageObjects);
    const [decoded, setDecoded] = useState(``);

    const findMessage = messageObjects.find((message) => message.id === activeEmail);
    const BodySize = findMessage.payload.body?.size;

    useEffect(() => {
        if (BodySize === 0) {

            console.log("BodySize is less than 0");

            // Handle the case when BodySize is less than 0
            const bodyContent = findMessage.payload.parts[1].body.data;
            const decodedBody = atob(bodyContent.replace(/-/g, '+').replace(/_/g, '/'));
            console.log('Decoded HTML:', decodedBody);
            setDecoded(decodedBody);
        }

        if (BodySize > 0) {
            console.log("BodySize is greater than 0");
            const bodyContent = findMessage.payload.body?.data;
            const decodedBody = atob(bodyContent.replace(/-/g, '+').replace(/_/g, '/'));
            console.log('Decoded HTML:', decodedBody);
            setDecoded(decodedBody);
        }

        }, [BodySize, findMessage]);


    const rendered = findMessage.payload.mimeType === "text/plain"
        ? (
            <div className='EmailContentBodyText'>
                <div dangerouslySetInnerHTML={{ __html: decoded }} />
            </div>
        )
        : (
            <div className='EmailContentBodyHtml'>
                <div dangerouslySetInnerHTML={{ __html: decoded }} />
            </div>
        );



    return (
        <div className='EmailContent'>
            <IoMdArrowRoundBack className='Back-Arrow' size={25} onClick={() => dispatch(setShowEmailContent())} />

            {rendered}
        </div>
    );
}

export default EmailContent;
