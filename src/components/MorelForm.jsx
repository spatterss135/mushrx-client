import DistanceCalculator from "./functions/DistanceCalculator";
import FilterYear from "./queryComponents/FilterYear";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useUserInfo, useUserInfoUpdate } from "../context/UserContext";
import { useApiInfo, useApiInfoUpdate } from "../context/ApiContext";
export default function MorelForm({

}) {

  const userInfo = useUserInfo();
  const setUserInfo = useUserInfoUpdate();  
  const apiInfo = useApiInfo()
  const setApiInfo = useApiInfoUpdate()

  const [distanceQuery, setDistanceQuery] = useState(50);

  async function morelsWithinCertainDistance(e) {
    e.preventDefault();
    async function getMorelMarkers() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const rData = await response.json();
      console.log(rData)
      return rData;
    }
    let allShrooms = await getMorelMarkers();
    console.log(allShrooms)
    let tempMorels = [];
    for (let i = 0; i < allShrooms.length; i++) {
      let distance = DistanceCalculator(userInfo.userLocation, allShrooms[i]);
      let shroomYear = new Date(allShrooms[i].found_on).getFullYear();
      if (distance < distanceQuery && apiInfo.morels.years.includes(shroomYear)) {
        tempMorels.push(allShrooms[i]);
      }
    }
    setApiInfo({morels: {data: tempMorels, years: apiInfo.morels.years}});
  }

  return (
    <Form className="mushroom-query">
      <Form.Group className="mb-3 top-mushroom-data" controlId="formBasicEmail">
        <Form.Label>Look Within</Form.Label>
        <Form.Range
          type="range"
          min="25"
          max="200"
          defaultValue={distanceQuery}
          onChange={(e) => setDistanceQuery(e.target.value)}
        />
        <Form.Text>{distanceQuery} miles</Form.Text>
      </Form.Group>
      <FilterYear/>
      <Button variant="outline-light" onClick={morelsWithinCertainDistance}>
        Search
      </Button>
    </Form>
  );
}
