import { ProgressBar } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Loading({progress, setProgress, hw}){
    
    useEffect(() => {

        setTimeout(()=> {
            let amount = Math.floor(Math.random()*10)
            setProgress(progress+amount)
    }, 200)
    })

   
    return (
        <ProgressBar now={progress} /> 
    )
}