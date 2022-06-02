import { Button } from "react-bootstrap";
import { useRef, useEffect } from "react";



export default function UserMenuItem({text, action}) {


  return (
    <div>
      {text==='Friends' && <Button id='friend-button' variant="link" onClick={action}>{text}</Button> ||
      <Button  variant="link" onClick={action}>{text}</Button>}
   
    </div>
  );
}
