import DistanceCalculator from "./functions/DistanceCalculator";
import FilterYear from "./queryComponents/FilterYear";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function PeterPan({
  userLocation,
  years,
  setFilteredMorels,
  setYears,
}) {
  const [distanceQuery, setDistanceQuery] = useState(50);

  async function morelsWithinCertainDistance(e) {
    e.preventDefault()
    async function getMorelMarkers() {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'

        }
      });
      const rData = await response.json();
      return rData;
    }
    let allShrooms = await getMorelMarkers();
    let tempMorels = [];
    for (let i = 0; i < allShrooms.length; i++) {
      let distance = DistanceCalculator(userLocation, allShrooms[i]);
      let shroomYear = new Date(allShrooms[i].found_on).getFullYear();
      if (distance < distanceQuery && years.includes(shroomYear)) {
        tempMorels.push(allShrooms[i]);
      }
    }
    setFilteredMorels(tempMorels);
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
        <FilterYear setYears={setYears} years={years} />
        <Button variant='outline-light'onClick={morelsWithinCertainDistance}>
          Search
        </Button>
    </Form>
  );
}
