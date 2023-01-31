import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function EventCard({ name, address, city, state, zipcode, date, time, description, user}) {
    return (
        <div>
            <Col>
                <Card style={{padding: '20px', marginTop: '20px'}} className='text-center'>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                    <Card.Text>Where: {address} {city} {state} {zipcode}</Card.Text>
                    <Card.Text>When: {date}</Card.Text>
                    <Card.Text>Time: {time}</Card.Text>
                    <Button style={{width: '50%', margin: '0 auto'}}>View Event</Button>
                </Card>
            </Col>
        </div>
    )
}

export default EventCard