import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Accordion from 'react-bootstrap/Accordion';



function ProfilePage({ user, loading }) {
    
    if(loading) return <h1>Loading.............</h1>

    return (
        <div style={{margin: '50px'}}>
            <Container>
                <Card style={{height: '500px', width: '60%', margin: '0 auto'}}>
                    <Card.Header style={{fontSize: '2rem'}}>{user.first_name} {user.last_name}</Card.Header>
                    <Card.Body style={{display: 'flex'}}>
                        <Container style={{textAlign: 'center'}}>
                            <Card.Img src={user.image} style={{width: '200px'}}/>
                            <Card.Text>{user.email}</Card.Text>
                        </Container>
                        <Container>
                            <Accordion>
                                <Accordion.Header>Owned Events</Accordion.Header>
                                <Accordion.Body style={{fontSize: '.9rem'}}>
                                    {user.events?.map(event => {
                                        return <Accordion.Body>{event.name}</Accordion.Body>
                                    })}
                                </Accordion.Body>
                            </Accordion>
                            <Accordion>
                                <Accordion.Header>RSVP'd Events</Accordion.Header>
                                <Accordion.Body style={{fontSize: '.9rem'}}>
                                    {user.attending_events?.map(event => {
                                        return <Accordion.Body>{event.name}</Accordion.Body>
                                    })}
                                </Accordion.Body>
                            </Accordion>
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default ProfilePage