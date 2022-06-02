import { Button, Offcanvas, Nav } from "react-bootstrap";
import { useState } from "react";

import UserMenuItem from "./UserMenuItem";
import { useUserInfo, useUserInfoUpdate } from "../context/UserContext";
import { useFriendInfo, useFriendInfoUpdate } from "../context/FriendContext";

export default function UserMenu() {
  const userInfo = useUserInfo();
  const setUserInfo = useUserInfoUpdate();
  const friendInfo = useFriendInfo()
  const setFriendInfo = useFriendInfoUpdate()

  const handleClose = () => {
    setFriendInfo({friendBoxUp: false})
    setUserInfo({userMenuUp: false})
  }
  const handleShow = () => setUserInfo({userMenuUp: true});

  

  function signOut(){
      setUserInfo({user: undefined, userMenuUp: false})
      setFriendInfo({friendBoxUp: false})
  }

  function toggleFriends(){
      setUserInfo({userMenuUp: false})
      setFriendInfo({friendBoxUp: true})
  }

  return (
    <>
      <Button
        style={{ background: "none", border: "none", padding: "0px" }}
        onClick={handleShow}
      >
        <Nav.Item>
          <Nav.Link>{userInfo.user.username}</Nav.Link>
          <img
            className="avatar"
            src={`Avatars/identicon-${userInfo.user.avatar}.png`}
            alt=""
          />
        </Nav.Item>
      </Button>

      <Offcanvas
        show={userInfo.userMenuUp}
        onHide={handleClose}
        className='offcanvas-item'
        // backdropClassName="darkScreen"
      >
        <Offcanvas.Header closeButton >
          <Offcanvas.Title
          >
            <span>{userInfo.user.username}</span>
            <img
                style={{margin: '0rem 1rem'}}
              className="avatar"
              src={`Avatars/identicon-${userInfo.user.avatar}.png`}
              alt=""
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <UserMenuItem text='Sign Out' action={signOut}/>
          <UserMenuItem  text='Friends' action={toggleFriends}/> 
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
