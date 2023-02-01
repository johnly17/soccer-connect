import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';

import EventCard from "./EventCard"
import Map from './Map';


function ShowEvents({ user, events, loading }){

    console.log(user)

    const eventDiv = events?.map(event => {
        return (
            <EventCard
            id={event.id}
            name={event.name}
            address={event.address}
            city={event.city}
            date={event.date}
            description={event.description}
            state={event.state}
            time={event.time}
            zipcode={event.zipcode}
            />
        )
    })

    if (loading) return <h1>Loading...</h1>
    return (
        <div style={{marginTop: '20px'}}>
            {user.length !== 0 ? <h1 className='text-center' style={{marginBottom: '40px'}}>Welcome, {user.first_name}!</h1> : null}
            <h5 className='text-center' style={{marginBottom: '-10px'}}>Search for events by a city near you!</h5>
            <Form style={{width: '30%', margin: '0 auto', marginTop: '20px'}}>
                <Form.Control 
                placeholder='search for an event...' 
                className='shadow'
                />
            </Form>
            <Map events={events}/>
            <Container>
                <Row xs={3}>
                    {eventDiv}
                </Row>
            </Container>
        </div>
    )
}

export default ShowEvents