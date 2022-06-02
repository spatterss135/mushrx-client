import React from 'react'
import { useUserInfo } from '../../context/UserContext'


function FriendItem({friend, search,   getFriends, getRequests }) {
  const userInfo = useUserInfo()
 console.log(friend)
  async function requestFriendship(){
    console.log('requiestin')
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/friends/`, 
    {method: 'POST', 
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({friend_id: friend.id, user_id: userInfo.user.id})
  })
  getFriends()
  getRequests()
  }

  async function confirmFriendship(){
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/friends/requests/${friend.friendship_id}`, 
    {method: 'PUT', 
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({pending: false})
  })
  let responseTwo = await fetch(`${process.env.REACT_APP_BACKEND_URL}/friends/`, 
    {method: 'POST', 
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({friend_id: friend.id, user_id: userInfo.user.id, pending: false})
  })
  getFriends()
  getRequests()
  }

  async function removeFriendship(){
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/friends/`, 
    {method: 'DELETE', 
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({friend_id: friend.id, user_id: userInfo.user.id, both: true})
  })
  getFriends()
  getRequests()
  }

  async function cancelRequest(){
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/friends/`, 
    {method: 'DELETE', 
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({friend_id: friend.id, user_id: userInfo.user.id, both: false})
  })
  getFriends()
  getRequests()
  }

  async function openMessages(){
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/messages/${userInfo.user.id}/${friend.id}`,)
    let rData = await response.json()
    console.log(rData)
  }
  return (
    <div className='friend-item'>
        <div className='friend-name'>
        {friend.username}
        </div>
        <div  className='friend-options'>
          {!search &&  !friend.pending && <div className="friends-messages">
          <img  className='friends-messages-image' onClick={openMessages} src="Icons/messages.png" alt="" /> 
           <span>17</span>
          </div>}
          {search && friend.isFriend && 
        <div className="add-box">
           <img  className='friends-add-image already' onClick={removeFriendship} src="Icons/add-user.png" alt="" />
        </div>}
        {search && !friend.pending && !friend.isFriend &&
        <div className="add-box">
           <img  className='friends-add-image' onClick={requestFriendship} src="Icons/add-user.png" alt="" />
        </div>}
        {!search && friend.pending && 
        <div className="add-box">
           <img  className='friends-add-image pending'  onClick={confirmFriendship} src="Icons/add-user.png" alt="" />
        </div>}
        {search && friend.pending && 
        <div className="add-box">
           <img  className='friends-add-image pending'  onClick={cancelRequest} src="Icons/add-user.png" alt="" />
        </div>}
        
        <img className="friend-avatar" src={`Avatars/identicon-${friend.avatar}.png`} alt="" />
        </div>
         </div>
  )
}

export default FriendItem