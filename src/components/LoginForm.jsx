import { useState } from "react"
import  CloseButton  from "react-bootstrap/CloseButton"
import { Button } from "react-bootstrap"
import './LoginForm.css'

export default function LoginForm({setUser, userDB, setLoginFormUp}){

    const [hasAccount, setHasAccount] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    async function getUser(e){
        e.preventDefault()
        let response = await fetch('http://localhost:5000/users')
        let rData = await response.json()

        let usersInDB = rData.map(user => [user.username, user.password, user.id, user.avatar])

        let userMatch = usersInDB.filter(user => user[0] === username && user[1] === password)
        if (userMatch.length > 0){
            setUser({'username': username, 'id': userMatch[0][2], 'avatar': userMatch[0][3]})
            setLoginFormUp(false)
        }
    }

    async function makeUser(e){
        e.preventDefault()
        let usersInDB = userDB.map(user => [user.username, user.password, user.id])
        let userMatch = usersInDB.filter(user => user[0] === username && user[1] === password)
        if (userMatch.length === 0){
            await fetch('http://localhost:5000/users/',   {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
    
                  },
                 body: JSON.stringify({username: username, password: password})
            })
            setLoginFormUp(false)
        }

    }
    return (
        <div className="darkScreen">
            
        <div className="loginForm">
        <CloseButton  onClick={()=> setLoginFormUp(false)}/>
        
        <form onSubmit={(e)=> {
            if (hasAccount) getUser(e)
            else {
                makeUser(e)
            }}} action="/" method="get">
            <fieldset>
            <legend className="pb-3">{hasAccount && 'Sign In To Get Your Personal Data' || 'Create Account To Create Your Own Markers'}</legend>
            <label className="pe-1" htmlFor="username">Username</label>
            <input className="me-5" onChange={(e)=> setUsername(e.target.value)} type="text" name='username'/>
            <label className="pe-1" htmlFor="password">Password</label>
            <input className=''onChange={(e)=> setPassword(e.target.value)} type="text" name='password'/>
            <Button className='ms-2 py-1' size="sm" type="submit" variant="outline-light">{hasAccount && "> Sign In" || 'Register'}</Button>
            </fieldset> 
            <Button className='mt-3' size="sm" variant="outline-light" onClick={() => setHasAccount(!hasAccount)}>{hasAccount && "> Sign Up" || 'Sign In'}</Button>
        </form>
        </div>
        </div>
        
    )
}