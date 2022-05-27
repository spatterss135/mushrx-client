import { Button, Tabs, Tab } from "react-bootstrap";
import { useUserInfo, useUserInfoUpdate } from "../context/UserContext";
import { useApiInfo, useApiInfoUpdate } from "../context/ApiContext";
export default function UserChangingLocationPanel({}) {
  const userInfo = useUserInfo();
  const setUserInfo = useUserInfoUpdate();

  const apiInfo = useApiInfo();
  const setApiInfo = useApiInfoUpdate();

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserInfo({
        userLocation: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        },
      });
    });
  };

  return (
    <>
      {userInfo.userChangingLocation && (
        <div className="noteboard">
          <div>
            Change your location by clicking anywhere on the map,
            <span> </span>
            <a
              onClick={getLocation}
              className="a-button-to-get-user-actual-location"
              style={{ textDecoration: "underline" }}
            >
              using your device's location
            </a>
          </div>
          <div>
            <Button
              className="mt-3"
              variant="outline-light"
              onClick={() => {
                setUserInfo({
                  userChangingLocation: false,
                  userHasChangedLocations: true,
                });
                setApiInfo({ soilData: undefined });
                setApiInfo({
                  weatherData: {
                    data: undefined,
                    dates: apiInfo.weatherData.dates,
                  },
                });
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
