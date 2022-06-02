import React, { useState, createContext, useContext } from "react";

const FriendContext = React.createContext();
const FriendContextUpdate = React.createContext();

export function useFriendInfo() {
  return useContext(FriendContext);
}

export function useFriendInfoUpdate() {
  return useContext(FriendContextUpdate);
}

export function FriendProvider({ children }) {

  const [friendInfo, setFriendInfo] = useState({
    friendBoxUp: false,
    userFriends: [],
    friendRequests: [],
    searchingBoardUp: false,
    pendingBoardUp: false
  });

  function friendInfoHandler(newInfo) {
    setFriendInfo((oldInfo) => {
      return {
        ...oldInfo,
        ...newInfo,
      };
    });
  }

  return (
    <FriendContext.Provider value={friendInfo}>
      <FriendContextUpdate.Provider value={friendInfoHandler}>
        {children}
      </FriendContextUpdate.Provider>
    </FriendContext.Provider>
  );
}