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
  setlatLong,
  buttonType
})

{
  let x;
  let y;
  if (buttonType ==='light'){
    x = {'backgroundColor': 'white'}
    y= {"color": 'black'}
  }
  return (
    <ButtonGroup vertical>
      <Button onClick={findUser} variant={buttonType} title="Find User">
        <img className="userlocate-btn" src="Icons/user.png" alt="Find User"/>
      </Button>
      {user && (
        <Button
          onClick={() => {
            setlatLong(undefined)
            setUserIsAddingNewMarker(!userIsAddingNewMarker)
          }}
          variant={buttonType}
          title="Add Point"
        >
          <img className="userlocate-btn" src="Icons/plus.png" alt="Add Point"/>
        </Button>
      )}
      {user && (
        <Button
          onClick={() => {
            setPolyPoints([]);
            setUserIsAddingNewPolygon(!userIsAddingNewPolygon);
          }}
          variant={buttonType}
          title="Add Polygon"
        >
          <img className="userlocate-btn" src="Icons/shapes.png" alt="Add Polygon"/>
        </Button>
      )}
      <Dropdown
        onSelect={changeLayer}
        as={ButtonGroup}
        drop="start"
        variant={buttonType}
      >
        <Dropdown.Toggle id="dropdown-custom-1" variant={buttonType}>
          <img className="userlocate-btn" src="Icons/map.png" alt="Layer Menu"/>
        </Dropdown.Toggle>
        <Dropdown.Menu style={x}>
          <Dropdown.Item  style={y} eventKey="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png">
            StreetMap
          </Dropdown.Item>
          <Dropdown.Item style={y} eventKey="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png">
            TopoMap
          </Dropdown.Item>
          <Dropdown.Item style={y} eventKey="https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=6cc7d3a6b182473e8aa8a19d7838d306">
            Something else
          </Dropdown.Item>
          <Dropdown.Item  style={y} eventKey='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'>
            Earth
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
  );
}
