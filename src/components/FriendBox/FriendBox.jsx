import { useEffect, useState } from "react";
import { Nav, Form, CloseButton } from "react-bootstrap";
import { useUserInfo } from "../../context/UserContext";
import FriendItem from "./FriendItem";
import {
  useFriendInfo,
  useFriendInfoUpdate,
} from "../../context/FriendContext";

import "./FriendBox.css";
import FriendSearch from "./FriendSearch";

export default function FriendBox() {
  const userInfo = useUserInfo();

  const friendInfo = useFriendInfo();
  const setFriendInfo = useFriendInfoUpdate();

  // const [friends, setFriends] = useState(undefined);
  // const [friendObjects, setFriendObjects] = useState([])
  // const [searching, setSearching] = useState(false);
  // const [pendingBoard, setPendingBoard] = useState(false)

  const [text, setText] = useState("");
  async function getFriends() {
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/friends/${userInfo.user.id}`
    );
    let rData = await response.json();
    console.log(rData)
    // setFriendObjects(rData);
    let tempArray = [];
    rData.forEach((friend) => {
      tempArray.push(friend.friend_id);
    });
    if (tempArray.length > 0) {
      let responseTwo = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${tempArray}`
      );
      let rDataTwo = await responseTwo.json();
      console.log(rDataTwo)
      rDataTwo = rDataTwo.map((friend, index) => {
        return {
          ...friend, 
          pending: rData[index].pending
        }
      })
      console.log(rDataTwo)
      setFriendInfo({userFriends: rDataTwo})
      console.log(friendInfo)
    }
     else {
      setFriendInfo({userFriends: []})
    }
  }


  async function getRequests() {
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/friends/requests/${userInfo.user.id}`
    );
    let rData = await response.json();

    // setFriendObjects(rData);
    let tempArray = [];
    rData.forEach((friend) => {
      tempArray.push(friend.user_id);
    });
    if (tempArray.length > 0) {
      let responseTwo = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/users/${tempArray}`
      );
      let rDataTwo = await responseTwo.json();
      rDataTwo = rDataTwo.map((friend, index) => {
        return {
          ...friend, 
          pending: rData[index].pending,
          friendship_id: rData[index].id
        }
      })

      setFriendInfo({friendRequests: rDataTwo})
    }
     else {
      setFriendInfo({friendRequests: []})
    }
  }

  useEffect(() => {
    

    
    if (userInfo.user) {
      getRequests()
      getFriends();}
    
  }, [friendInfo.friendBoxUp]);

  // function checkFriendStatus(user) {
  //   let friendIds = [];
  //   friendObjects.forEach((friend) => friendIds.push(friend.friend_id));
  //   if (friendIds.includes(user.id)) {
  //     let isPending = friendObjects.some((friendship) => {
  //       return (
  //         friendship.user_id == userInfo.user.id &&
  //         friendship.friend_id == user.id &&
  //         friendship.pending
  //       );
  //     });
  //     if (isPending) return "Pending";
  //     return "Yes";
  //   }
  //   return "No";
  // }

  return (
    <>
    {friendInfo.friendBoxUp && 
    <div className="darkScreen">
    <div className="friend-box">
      <CloseButton onClick={() => setFriendInfo({friendBoxUp: false}) }/>

      <Nav id="friend-nav">
        <Nav.Item
          onClick={() => {
            setFriendInfo({searchingBoardUp: false,
                            pendingBoardUp: false})
          }}
        >
          <Nav.Link>Friends</Nav.Link>
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            setFriendInfo({searchingBoardUp: false,
              pendingBoardUp: true})
          }}
        >
          <Nav.Link>Pending</Nav.Link>
        </Nav.Item>
        <Nav.Item
          onClick={() => {
            setFriendInfo({searchingBoardUp: true,
              pendingBoardUp: false})
          }}
        >
          <Nav.Link>Search</Nav.Link>
        </Nav.Item>
      </Nav>

      {!friendInfo.searchingBoardUp && !friendInfo.pendingBoardUp && (
        <div className="your-friends">
          <div>Your Friends...</div>
          <div className="friend-table">
            {friendInfo.userFriends.map((friend) => {
              if (!friend.pending){
                return <FriendItem  getFriends={getFriends} getRequests={getRequests} search={false} friend={friend}/> 
              }
              
            })}
          </div>
        </div>
      )}
         {friendInfo.pendingBoardUp && 
                      <div className="your-friends">
                      <div>Friend Requests</div>
                      <div className="friend-table">
                        {friendInfo.friendRequests.map((friend) => {
                      if (friend.pending){
                        return <FriendItem  getFriends={getFriends} getRequests={getRequests} id={friend.friendship_id} search={false} friend={friend}/> 
                      }
                        })}
                      </div>
                    </div>}

                    {friendInfo.searchingBoardUp && (
            <div className="friend-search">
              <div>Mushrx Users...</div>
              <div className="friend-table">
                <FriendSearch getFriends={getFriends} getRequests={getRequests} text={text} />
              </div>
            </div>
          )}

          {friendInfo.searchingBoardUp && (
            <Form>
              <input
                onChange={(e) => setText(e.target.value)}
                className="search-bar"
              ></input>
            </Form>
          )}

       
    </div>
  </div>}
      
      
      
      
      
      
      
      
      
      

    </>
  );
}
