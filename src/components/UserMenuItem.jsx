import { Button } from "react-bootstrap";

export default function UserMenuItem({text, action}) {
  return (
    <div>
      <Button variant="link" onClick={action}>{text}</Button>
    </div>
  );
}
