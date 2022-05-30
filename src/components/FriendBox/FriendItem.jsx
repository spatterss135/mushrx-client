import React from 'react'

function FriendItem({friend}) {
  return (
    <div className='friend-item'>
        <div className='friend-name'>
        {friend.username}
        </div>
        <div  className='friend-options'>
          <div className="friends-messages">
          <img  className='friends-messages-image' src="Icons/messages.png" alt="" />
          <span>17</span>
          </div>
        
        <img className="friend-avatar" src={`Avatars/identicon-${friend.avatar}.png`} alt="" />
        </div>
         </div>
  )
}

export default FriendItem