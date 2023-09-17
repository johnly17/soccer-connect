import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import EventCard from "./EventCard"
import Map from './Map';


function ShowEvents({ user, events, loading }){

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
        <div style={{paddingTop: '30px'}}>
            {user.length !== 0 ? <h1 className='text-center' style={{marginBottom: '40px'}}>Welcome, {user.first_name}!</h1> : null}
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