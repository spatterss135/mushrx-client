import React, { useState, createContext, useContext } from "react";

const UserContext = React.createContext();
const UserContextUpdate = React.createContext();

export function useUserInfo() {
  return useContext(UserContext);
}

export function useUserInfoUpdate() {
  return useContext(UserContextUpdate);
}

export function UserProvider({ children }) {
  const [UsersInfo, setUsersInfo] = useState({
      user: undefined, 
      userLocation: undefined,
      userChangingLocation: false,
      userHasChangedLocations: true,
      userCity: 'Pudding'
  });

  function UserInfoHandler(newInfo) {
    setUsersInfo((oldInfo) => {
      return {
        ...oldInfo,
        ...newInfo,
      };
    });
  }

  return (
    <UserContext.Provider value={UsersInfo}>
      <UserContextUpdate.Provider value={UserInfoHandler}>
        {children}
      </UserContextUpdate.Provider>
    </UserContext.Provider>
  );
}
