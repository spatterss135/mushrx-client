import { useState, useContext } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";
import "./LoginForm.css";
import { useLoginInfo, useLoginInfoUpdate } from "../context/LoginContext";
import { useUserInfo, useUserInfoUpdate } from "../context/UserContext";

export default function LoginForm({ setUser, setLoginFormUp }) {

  const loginInfo = useLoginInfo()
  const setLoginInfo = useLoginInfoUpdate()

  const userInfo = useUserInfo();
  const setUserInfo = useUserInfoUpdate();

 
 
  async function getAUser(e) {
    if (e) e.preventDefault();
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ username: loginInfo.username, password: loginInfo.password }),
      }
    );
    let rData = await response.json();
    if (rData !== 'Failure') {
      setLoginInfo({failedLoginAttempt: false, failedSignupAttempt: false, loginFormUp: false})
      setUserInfo({user: rData})
    } else {
      console.log(rData)
      setLoginInfo({failedLoginAttempt: true})
    }
  }

  // async function makeUser(e) {
  //   e.preventDefault();
  //   let usersInDB = userDB.map((user) => [
  //     user.username,
  //     user.password,
  //     user.id,
  //   ]);
  //   let userMatch = usersInDB.filter(
  //     (user) => user[0] === username && user[1] === password
  //   );
  //   if (userMatch.length === 0) {
  //     await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/create`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       body: JSON.stringify({ username: username, password: password }),
  //     });
  //     setLoginFormUp(false);
  //   }
  // }

  async function makeAUser(e) {
    e.preventDefault();

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ username: loginInfo.username, password: loginInfo.password }),
      });
      const rData = await response.json()
      if (rData == 'Success'){
        getAUser()
      }
      else {
        setLoginInfo({failedSignupAttempt: true})
      }
  }

  return (
    <>
    {loginInfo.loginFormUp &&     <div className="darkScreen">
      <div className="loginForm">
        <CloseButton onClick={() => setLoginInfo({loginFormUp: false})} />

        <form
          onSubmit={(e) => {
            if (loginInfo.hasAccount) getAUser(e);
            else {
              makeAUser(e);
            }
          }}
          action="/"
          method="get"
        >
          <fieldset>
            <legend className="pb-3">
              {(loginInfo.hasAccount && "Sign In To Get Your Personal Data") ||
                "Create Account To Create Your Own Markers"}
            </legend>
            <label className="pe-1" htmlFor="username">
              Username
            </label>
            <input
              className="me-5"
              onChange={(e) => setLoginInfo({username: e.target.value})}
              type="text"
              name="username"
            />
            <label className="pe-1" htmlFor="password">
              Password
            </label>
            <input
              className=""
              onChange={(e) => setLoginInfo({password: e.target.value})}
              type="password"
              name="password"
            />
            {loginInfo.failedLoginAttempt && <div>Invalid username or password</div>}
            {loginInfo.failedSignupAttempt && <div>Username already exists</div>}
            <Button
              className="ms-2 py-1"
              size="sm"
              type="submit"
              variant="outline-light"
            >
              {(loginInfo.hasAccount && "Sign In") || "Register"}
            </Button>
          </fieldset>
          <div>
            <span>{loginInfo.hasAccount && "New to Mushrx?" || "Already a Shroomer?"}</span>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                textDecoration: 'underline'


              }}
              onClick={(e) => {
                e.preventDefault()
        
                setLoginInfo({hasAccount: !loginInfo.hasAccount})}}
            >
              {(loginInfo.hasAccount && "Sign Up") || "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>}
    </>

  );
}
