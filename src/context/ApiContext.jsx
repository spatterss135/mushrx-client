import React, { useState, createContext, useContext } from "react";

const ApiContext = React.createContext();
const ApiContextUpdate = React.createContext();

export function useApiInfo() {
  return useContext(ApiContext);
}

export function useApiInfoUpdate() {
  return useContext(ApiContextUpdate);
}

export function ApiProvider({ children }) {
    // const [weatherData, setWeatherData] = useState(undefined);
    // const [soilData, setSoilData] = useState(undefined);
    // const [years, setYears] = useState([2021, 2020, 2019, 2018, 2017]);
    // const [filteredMorels, setFilteredMorels] = useState([]);
    // const [dates, setDates] = useState([]);
  const [apiInfo, setApiInfo] = useState({
    weatherData: {
        data: undefined,
        dates: []
    },
    soilData: undefined,
    morels: {
        data: [],
        years: [2021, 2020, 2019, 2018, 2017]
    },
    
  });

  function apiInfoHandler(newInfo) {
    setApiInfo((oldInfo) => {
      return {
        ...oldInfo,
        ...newInfo,
      };
    });
  }

  return (
    <ApiContext.Provider value={apiInfo}>
      <ApiContextUpdate.Provider value={apiInfoHandler}>
        {children}
      </ApiContextUpdate.Provider>
    </ApiContext.Provider>
  );
}
