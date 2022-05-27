import React, { useState, createContext, useContext } from "react";

const PolygonContext = React.createContext();
const PolygonContextUpdate = React.createContext();

export function usePolygonInfo() {
  return useContext(PolygonContext);
}

export function usePolygonInfoUpdate() {
  return useContext(PolygonContextUpdate);
}

export function PolygonProvider({ children }) {
  const [polygonsInfo, setPolygonsInfo] = useState({
    userPolygons: undefined,
    polygonPoints: undefined,
    userIsAddingNewPolygon: false,
    polygonNotes: undefined
  });

  function polygonInfoHandler(newInfo) {
    setPolygonsInfo((oldInfo) => {
      return {
        ...oldInfo,
        ...newInfo,
      };
    });
  }

  return (
    <PolygonContext.Provider value={polygonsInfo}>
      <PolygonContextUpdate.Provider value={polygonInfoHandler}>
        {children}
      </PolygonContextUpdate.Provider>
    </PolygonContext.Provider>
  );
}