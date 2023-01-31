import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useState } from 'react'

function CreateEvent() {

  const [eventName, setEventName] = useState('')
  const [eventDesc, setEventDesc] = useState('')
  const [evenDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [eventAddress, setEventAddress] = useState('')
  const [eventCity, setEventCity] = useState('')
  const [eventState, setEventState] = useState('')
  const [eventZipcode, setEventZipcode] = useState(0)

  return (
    <div>
      <h1 className="text-center" style={{ marginTop: "40px" }}>
        {" "}
        Enter Event Details Below:
      </h1>
      <Form style={{ width: "50%", margin: "0 auto" }}>
        <Form.Label>Event Name:</Form.Label>
        <Form.Control placeholder="Event Name" />
        <Form.Label style={{marginTop: '5px'}}>Enter Description: </Form.Label>
        <Form.Control placeholder="Enter description" type="textarea"/>
        <Row style={{marginTop: '5px'}}>
          <Col>
          <Form.Label>When:</Form.Label>
            <Form.Control placeholder="When" type='date' onChange={e => console.log(e.target.value)}/>
          </Col>
          <Col>
          <Form.Label>Time:</Form.Label>
            <Form.Control placeholder="Time" type='time'/>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginTop: '5px'}}>
          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" placeholder="Enter address..." />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasic">
        <Row>
          <Col>
          <Form.Label>City:</Form.Label>
            <Form.Control placeholder="City" />
          </Col>
          <Col>
          <Form.Label>State:</Form.Label>
            <Form.Control placeholder="State" />
          </Col>
          <Col>
            <Form.Label>Zipcode:</Form.Label>
            <Form.Control placeholder="Zipcode" />
          </Col>
        </Row>
        </Form.Group>
        <Button style={{marginRight: '10px'}}variant="primary" type="submit">
          Create Listing
        </Button>
        <Button variant="primary" type="submit">
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default CreateEvent;
