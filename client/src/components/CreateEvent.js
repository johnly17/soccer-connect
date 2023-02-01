import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateEvent({ user, handleNewEvent }) {

  const [eventName, setEventName] = useState('')
  const [eventDesc, setEventDesc] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventTime, setEventTime] = useState('')
  const [eventAddress, setEventAddress] = useState('')
  const [eventCity, setEventCity] = useState('')
  const [eventState, setEventState] = useState('')
  const [eventZipcode, setEventZipcode] = useState(0)
  const [newEventError, setNewEventError] = useState('')

  console.log(user)
  const nav = useNavigate()

  function handleEventSubmit(e) {
    e.preventDefault()
    fetch('/events', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: eventName,
        address: eventAddress,
        city: eventCity,
        state: eventState,
        zipcode: eventZipcode,
        time: eventTime,
        date: eventDate,
        description: eventDesc,
        user_id: user.id
      })
    })
    .then(r => {
      if (r.ok) {
        r.json().then(data => {
          handleNewEvent(data)
          nav('/events')
        })
      } else {
        r.json().then(data => {
          setNewEventError(Object.entries(data.errors))
        })
      }
    })
  }

  return (
    <div style={{marginBottom: '50px'}}>
      <h1 className="text-center" style={{ marginTop: "40px" }}>
        {" "}
        Enter Event Details Below:
      </h1>
      <Form style={{ width: "50%", margin: "0 auto" }} onSubmit={handleEventSubmit}>
        <Form.Label>Event Name:</Form.Label>
        <Form.Control 
        placeholder="Event Name"
        value={eventName}
        onChange={e => setEventName(e.target.value)}
        />
        <Form.Label style={{marginTop: '5px'}}>Enter Description: </Form.Label>
        <Form.Control 
        placeholder="Enter description" 
        type="textarea"
        value={eventDesc}
        onChange={e => setEventDesc(e.target.value)}
        />
        <Row style={{marginTop: '5px'}}>
          <Col>
          <Form.Label>When:</Form.Label>
            <Form.Control 
            placeholder="When" 
            type='date'
            value={eventDate}
            onChange={e => setEventDate(e.target.value)}
            />
          </Col>
          <Col>
          <Form.Label>Time:</Form.Label>
            <Form.Control 
            placeholder="Time" 
            type='time'
            value={eventTime}
            onChange={e => setEventTime(e.target.value)}
            />
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicEmail" style={{marginTop: '5px'}}>
          <Form.Label>Address:</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Enter address..."
          value={eventAddress}
          onChange={e => setEventAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasic">
        <Row>
          <Col>
          <Form.Label>City:</Form.Label>
            <Form.Control 
            placeholder="City"
            value={eventCity}
            onChange={e => setEventCity(e.target.value)}
            />
          </Col>
          <Col>
          <Form.Label>State:</Form.Label>
            <Form.Control 
            placeholder="State"
            value={eventState}
            onChange={e => setEventState(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Zipcode:</Form.Label>
            <Form.Control 
            placeholder="Zipcode"
            value={eventZipcode}
            onChange={e => setEventZipcode(e.target.value)}
            />
          </Col>
        </Row>
        </Form.Group>
        <Button variant="primary" type="submit" style={{marginRight: '10px'}}>
          Create Event
        </Button>
        <Button variant="primary" href='/events'>
          Cancel
        </Button>
      </Form>
      {newEventError ? (newEventError.map(e => <div><h1 style={{ textAlign: 'center', color: 'red' }}>{e[1]}</h1></div>)
            ) : null}
    </div>
  );
}

export default CreateEvent;
