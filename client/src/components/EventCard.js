import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


function EventCard({
  name,
  address,
  city,
  state,
  zipcode,
  date,
  time,
  description,
  user,
  id
}) {


  return (
    <div>
      <Col>
        <Card
          style={{
            padding: "20px",
            margin: "50px auto",
            border: "2px solid blue",
          }}
          className="text-center shadow-lg"
        >
          <Card.Title>{name}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>
            <strong>Where:</strong> {address} {city} {state} {zipcode}
          </Card.Text>
          <Card.Text>
            <strong>When:</strong> {date}
          </Card.Text>
          <Card.Text>
            <strong>Time:</strong> {time}
          </Card.Text>
          <Button href={`/event/${id}`} style={{ width: "40%", margin: "0 auto" }} variant="success">View Event</Button>
          {/* {user ? <Button href={`/event/${id}`} style={{ width: "40%", margin: "0 auto" }}>View Event</Button> : null} */}
        </Card>
      </Col>
    </div>
  );
}

export default EventCard;
