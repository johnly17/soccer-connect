import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EventDetailsPage({ user, events }) {
  const [eventDetail, setEventDetail] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/events/${id}`)
      .then((r) => r.json())
      .then((data) => setEventDetail(data));
  }, [id]);


  const membersRSVP = eventDetail.attending_users?.map((user) => {
    return (
      <Card.Text style={{ padding: "15px" }}>
        <Card.Img
          src={`${user.image}`}
          style={{ width: "60px", height: "45px" }}
        />
        {user.first_name} {user.last_name}
      </Card.Text>
    );
  });

  console.log(membersRSVP)

  return (
    <div>
      <Button
        style={{ margin: "20px 0 0 20px" }}
        href="/events"
        variant="warning"
      >
        Back
      </Button>
      <Container>
        <Row>
          <Col>
            <Card style={{ width: "100%" }}>
              <Card.Header>
                <strong>Hosted By:</strong> {eventDetail.user?.first_name}{" "}
                {eventDetail.user?.last_name}
              </Card.Header>
              <Card.Body>
                <Card.Title>{eventDetail.name}</Card.Title>
                <Card.Text>{eventDetail.description}</Card.Text>
                <Row>
                  <Col>
                    <Card.Text>
                      <strong>When:</strong> {eventDetail.date}
                    </Card.Text>
                  </Col>
                  <Col>
                    <Card.Text>
                      <strong>Time:</strong> {eventDetail.time}
                    </Card.Text>
                  </Col>
                </Row>
                <Card.Text>
                  <strong>Where:</strong> {eventDetail.address}{" "}
                  {eventDetail.city} {eventDetail.state} {eventDetail.zipcode}
                </Card.Text>
                <Button variant="primary">RSVP</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "100%" }}>
              <Card.Header>Members Attending</Card.Header>
              {eventDetail.attending_users?.length > 0 ? membersRSVP : <Card.Text style={{padding: '15px'}}>Be the first to RSVP!</Card.Text>}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default EventDetailsPage;
