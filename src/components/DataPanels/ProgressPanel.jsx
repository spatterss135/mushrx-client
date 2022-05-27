import { ProgressBar } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Loading({ progress, setProgress, hw }) {
  const [message, setMessage] = useState("Retrieving Local Weather Data");

  useEffect(() => {
    
    let amount = Math.ceil(Math.random() * 13);
    let time = setInterval(() => {
      setProgress(progress => progress + amount );

    }, 200);
    return () => {clearInterval(time)}
  }, []);

  useEffect(()=> {
    if (progress > 25) {
      setMessage("Parsing out Relevant Data");
    }
    if (progress > 50) {
      setMessage("This Progress Bar isn't real...");
    }
    if (progress > 60) {
      setMessage("None of this is real");
    }
    if (progress > 75) {
      setMessage("You took the red pill...");
    }
    if (progress > 80) {
      setMessage("Almost done! :)");
    }
  })

  return (
    <div className="progress-panel">
      <div>{message}...</div>
      <ProgressBar style={{width: '15rem'}} now={progress} />
    </div>
  );
}
