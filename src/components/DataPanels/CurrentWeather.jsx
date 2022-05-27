import ToFarenheit from "../functions/ToFarenheit";
import { Table, Button } from "react-bootstrap";
import { useUserInfo, useUserInfoUpdate } from "../../context/UserContext";
import { useApiInfo, useApiInfoUpdate } from "../../context/ApiContext";
export default function CurrentWeather({ setHw, setProgress }) {
  const userInfo = useUserInfo();
  const setUserInfo = useUserInfoUpdate();

  const apiInfo = useApiInfo();
  const setApiInfo = useApiInfoUpdate();
  const currentYear = new Date().getFullYear();
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th colSpan={5}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>Todays Weather In {userInfo.userCity}</div>
              {userInfo.user && (
                <div>
                  <Button
                    onClick={() => {
                      document.getElementById("root").click();
                      setUserInfo({ userChangingLocation: true });
                    }}
                    variant="light"
                    style={{
                      background: "none",
                      borderColor: "red",
                      color: "antiquewhite",
                    }}
                  >
                    Change My Location
                  </Button>
                </div>
              )}
            </div>
          </th>
        </tr>
        <tr>
          <th>Description</th>
        </tr>
        <tr>
          <th>Temp (F)</th>
          <th>Humidity (%)</th>
          <th>Wind Speed (mph)</th>
          <th>Soil Moisture(%)</th>
          <th>Soil Temperature(F)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{apiInfo.weatherData.data[currentYear].days[4].temp}</td>
          <td>{apiInfo.weatherData.data[currentYear].days[4].humidity}</td>
          <td>{apiInfo.weatherData.data[currentYear].days[4].windspeed}</td>
          <td>{apiInfo.soilData && apiInfo.soilData["soilMoisture"][0]}</td>
          <td>
            {apiInfo.soilData &&
              ToFarenheit(apiInfo.soilData["soilTemperature"][0])}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={5}>
            <Button
              variant="outline-light"
              onClick={() => {
                setProgress(0);
                setHw(true);
              }}
            >
              Compare to historical weather in this area
            </Button>
          </td>
        </tr>
      </tfoot>
    </Table>
  );
}
