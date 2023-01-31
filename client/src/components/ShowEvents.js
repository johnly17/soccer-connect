import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import EventCard from "./EventCard"

function ShowEvents({ events }){
    console.log(events[0])

    const eventDiv = events?.map(event => {
        return (
            <EventCard 
            name={event.name}
            address={event.address}
            city={event.city}
            date={event.date}
            description={event.description}
            state={event.state}
            time={event.time}
            zipcode={event.zipcode}
            user={event.user.first_name}
            />
        )
    })

    return (
        <div>
            <Container>
                <Row>
                    {eventDiv}
                </Row>
            </Container>
        </div>
    )
}

export default ShowEvents