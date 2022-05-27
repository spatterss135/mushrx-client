import  React, { useState, createContext, useContext } from "react";


const LoginContext = React.createContext()
const LoginContextUpdate = React.createContext()

export function useLoginInfo(){
    return useContext(LoginContext)
}

export function useLoginInfoUpdate(){
    return useContext(LoginContextUpdate)
}

export function LoginProvider({ children }){


  const [loginInfo, setLoginInfo] = useState({
      hasAccount: true,
      username: '',
      password: '',
      failedLoginAttempt: false,
      failedSignupAttempt: false,
      loginFormUp: false
  })


  function loginInfoHandler(newInfo){
      setLoginInfo(oldInfo => {
          return {
              ...oldInfo,
              ...newInfo
          }
      })
  }

  return(
      <LoginContext.Provider value={loginInfo}>
          <LoginContextUpdate.Provider value={loginInfoHandler}>
              {children}
          </LoginContextUpdate.Provider>
      </LoginContext.Provider>
  )
}
