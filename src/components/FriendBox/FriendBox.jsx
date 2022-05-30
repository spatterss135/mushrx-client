import { useEffect, useState } from "react"
import { Nav } from "react-bootstrap"
import { useUserInfo } from "../../context/UserContext"
import FriendItem from "./FriendItem"

import './FriendBox.css'

export default function FriendBox({friendBoxUp}){

    const userInfo = useUserInfo()

    const [friends, setFriends] = useState('')

    useEffect(()=> {
        async function getFriends(){
            let response = await fetch( `${process.env.REACT_APP_BACKEND_URL}/friends/${userInfo.user.id}`)
            let rData = await response.json()
            
            let tempArray = []
            rData.forEach(friend => {
                tempArray.push(friend.friend_id)
            })
            let responseTwo = await fetch( `${process.env.REACT_APP_BACKEND_URL}/users/${tempArray}`)
            let rDataTwo = await responseTwo.json()
            console.log(rDataTwo)
            setFriends(rDataTwo)
        }
        getFriends()
        

    }, [friendBoxUp])

    return (
        <>
        {friends && 
        <div className="friend-box">
            <div>
            <Nav id='friend-nav'>
            <Nav.Item>
                <Nav.Link>
                    Friends
                </Nav.Link>
            </Nav.Item>
        </Nav>
            </div>
     
        <div>Your Friends...</div>
        <div className="friend-table">
        {friends.map(friend => {
            return (
                <FriendItem friend={friend}/>
            )
        })}
        </div>
       
    </div>}
        </>
        
    )
}