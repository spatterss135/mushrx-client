import { Form } from "react-bootstrap";

import { useApiInfo, useApiInfoUpdate } from "../../context/ApiContext";

export default function FilterYear({}) {

  const apiInfo = useApiInfo()
  const setApiInfo = useApiInfoUpdate()

  function changeQueryYear(e) {
    if (e.target.checked) {
      setApiInfo({morels: {data: apiInfo.morels.data, years: [...apiInfo.morels.years, Number(e.target.value)]}});
    } else {
      var array = [...apiInfo.morels.years];
      var index = array.indexOf(Number(e.target.value));
      if (index !== -1) {
        array.splice(index, 1);
        setApiInfo({morels: {data: apiInfo.morels.data, years: array}});
      }
    }
  }
  return (
    <Form.Group>
      <Form.Text>From the Years</Form.Text>
      <Form.Check
        defaultChecked
        type="switch"
        id="2017"
        label="2017"
        value="2017"
        onClick={(e) => changeQueryYear(e)}
      />
      <Form.Check
        defaultChecked
        type="switch"
        id="2018"
        label="2018"
        value="2018"
        onClick={(e) => changeQueryYear(e)}
      />
      <Form.Check
        defaultChecked
        type="switch"
        id="2019"
        label="2019"
        value="2019"
        onClick={(e) => changeQueryYear(e)}
      />
      <Form.Check
        defaultChecked
        type="switch"
        id="2020"
        label="2020"
        value="2020"
        onClick={(e) => changeQueryYear(e)}
      />
      <Form.Check
        defaultChecked
        type="switch"
        id="2021"
        label="2021"
        value="2021"
        onClick={(e) => changeQueryYear(e)}
      />
    </Form.Group>
  );
}
