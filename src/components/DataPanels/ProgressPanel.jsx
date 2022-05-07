import { ProgressBar } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Loading({progress, setProgress, hw}){

    const [message, setMessage] = useState('Retrieving Local Weather Data')
    
    useEffect(() => {
        let amount = Math.floor(Math.random()*5)
        setTimeout(()=> {
            
            setProgress(progress+amount)
            if (progress > 25) {
                setMessage('Parsing out Relevant Data')
            }
            if (progress > 50) {
                setMessage("This Progress Bar isn't real...")
            }
            if (progress > 60) {
                setMessage("None of this is real")
            }
            if (progress > 75) {
                setMessage("You took the red pill...")
            }
            if (progress > 80) {
                setMessage("Almost done! :)")
            }

    }, 200)
    })

   
    return (
        <div className="DisyoBoi">
            <div>{message}</div>
            <ProgressBar now={progress} /> 
        </div>
        
    )
}