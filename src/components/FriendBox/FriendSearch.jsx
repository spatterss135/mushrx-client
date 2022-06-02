import React from "react";
import { Placeholder } from "react-bootstrap";
import FriendItem from "./FriendItem";

import { useState, useEffect } from "react";
import { useUserInfo } from "../../context/UserContext";

import {
  useFriendInfo,
  useFriendInfoUpdate,
} from "../../context/FriendContext";

function FriendSearch({ text,  getFriends, getRequests}) {
  const userInfo = useUserInfo();
  const [users, setUsers] = useState([]);

  const friendInfo = useFriendInfo();
  const setFriendInfo = useFriendInfoUpdate();

  useEffect(() => {
    async function getUser() {
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/search/${text}`
      );
      let rData = await response.json();
      setUsers(rData);
    }
    if (text.length > 0) getUser();
  }, [text, friendInfo]);


  let friendIds = friendInfo.userFriends.map(friend => friend.id)
  let pendingStatus = friendInfo.userFriends.map(friend => friend.pending)
  return (
    <>
      {(!users.length > 0 && (
        <div>
          {[1, 2, 3, 4, 5].map(() => {
            return (
              <div className="friend-item">
                <div className="name-placeholder"></div>
                <div className="friend-options">
                  <div className="friends-messages">
                    <img
                      className="friends-messages-image"
                      src="Icons/messages.png"
                      alt=""
                    />
                  </div>

                  <span className="fake-avatar" alt=""></span>
                </div>
              </div>
            );
          })}
        </div>
      )) || (
        <div>


          {

          users.map((user, index) => {
            console.log(user)
            if (user.id !== userInfo.user.id) {
              friendIds.forEach((id, i) => {
                if (id == user.id && pendingStatus[i]){
                  user['pending'] = true
                  user['isFriend'] = false
                }
                else {
                  user['pending'] = false
                  user['isFriend'] = true
                }
              })
              return (
                <FriendItem getFriends={getFriends} getRequests={getRequests} friend={user} search={true} />
              );
            }
          })}
        </div>
      )}
    </>
  );
}

export default FriendSearch;
