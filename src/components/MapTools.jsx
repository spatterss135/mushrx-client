import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

export default function MapTools({
  findUser,
  user,
  setUserIsAddingNewMarker,
  changeLayer,
  setUserIsAddingNewPolygon,
  setPolyPoints,
  userIsAddingNewMarker, 
  userIsAddingNewPolygon,
  setlatLong
}) {
  return (
    <ButtonGroup vertical>
      <Button onClick={findUser} variant="outline-dark" title="Find User">
        <img className="userlocate-btn" src="Icons/user.png" />
      </Button>
      {user && (
        <Button
          onClick={() => {
            setlatLong(undefined)
            setUserIsAddingNewMarker(!userIsAddingNewMarker)
          }}
          variant="outline-dark"
          title="Add Point"
        >
          <img className="userlocate-btn" src="Icons/plus.png" />
        </Button>
      )}
      {user && (
        <Button
          onClick={() => {
            setPolyPoints([]);
            setUserIsAddingNewPolygon(!userIsAddingNewPolygon);
          }}
          variant="outline-dark"
          title="Add Polygon"
        >
          <img className="userlocate-btn" src="Icons/shapes.png" />
        </Button>
      )}
      <Dropdown
        onSelect={changeLayer}
        as={ButtonGroup}
        drop="start"
        variant="outline-dark"
      >
        <Dropdown.Toggle id="dropdown-custom-1" variant="outline-dark">
          <img className="userlocate-btn" src="Icons/map.png" />
        </Dropdown.Toggle>
        <Dropdown.Menu className="super-colors">
          <Dropdown.Item eventKey="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
            StreetMap
          </Dropdown.Item>
          <Dropdown.Item eventKey="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png">
            TopoMap
          </Dropdown.Item>
          <Dropdown.Item eventKey="https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=6cc7d3a6b182473e8aa8a19d7838d306">
            Something else
          </Dropdown.Item>
          <Dropdown.Item eventKey='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'>
            Earth
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
  );
}
