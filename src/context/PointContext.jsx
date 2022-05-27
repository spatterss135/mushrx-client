import React, { useState, createContext, useContext } from "react";

const PointContext = React.createContext();
const PointContextUpdate = React.createContext();

export function usePointInfo() {
  return useContext(PointContext);
}

export function usePointInfoUpdate() {
  return useContext(PointContextUpdate);
}

export function PointProvider({ children }) {

  const [pointsInfo, setPointsInfo] = useState({
    userPoints: undefined,
    latLong: undefined,
    userIsAddingNewMarker: false,
  });

  function pointInfoHandler(newInfo) {
    setPointsInfo((oldInfo) => {
      return {
        ...oldInfo,
        ...newInfo,
      };
    });
  }

  return (
    <PointContext.Provider value={pointsInfo}>
      <PointContextUpdate.Provider value={pointInfoHandler}>
        {children}
      </PointContextUpdate.Provider>
    </PointContext.Provider>
  );
}
