import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function EventDetailsPage({ user, events, loading }) {
  const [eventDetail, setEventDetail] = useState([]);
  const [attendingUsers, setAttendingUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/events/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setEventDetail(data);
        setAttendingUsers(data.attending_users);
      });
  }, [id]);

  console.log(eventDetail);
  console.log(attendingUsers);

  function handleRSVP() {
    fetch("/attendances", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        event_id: eventDetail.id,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setAttendingUsers([...attendingUsers, data]);
        });
      }
    });
  }

  // const membersRSVP = attendingUsers?.map((user) => {
  //   return (
  //     <Card.Text style={{ padding: "15px" }}>
  //       <Card.Img
  //         src={`${user.image}`}
  //         style={{ width: "60px", height: "45px" }}
  //       />
  //       {user.first_name} {user.last_name}
  //     </Card.Text>
  //   );
  // });

  if (loading) return <h1>Loading...</h1>;
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
                <Button variant="primary" type="submit" href={`/event/${id}}`} onClick={handleRSVP}>
                  RSVP
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: "100%" }}>
              <Card.Header>Members Attending</Card.Header>
              {eventDetail.attending_users?.length > 0 ? (
                attendingUsers?.map((user) => {
                  return (
                    <Card.Text
                      style={{ padding: "15px", marginBottom: "-15px" }}
                    >
                      <Card.Img
                        src={`${user.image}`}
                        style={{ width: "60px", height: "45px" }}
                      />
                      {user.first_name} {user.last_name}
                    </Card.Text>
                  );
                })
              ) : (
                <Card.Text style={{ padding: "15px" }}>
                  Be the first to RSVP!
                </Card.Text>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
      <Container style={{ marginTop: "30px", width: "50%" }}>
        <Card>
          <Card.Header>Comments</Card.Header>
          {eventDetail.comments?.length > 0 ? (
            eventDetail.comments.map((comment) => {
              return (
                <Card.Text style={{ paddingTop: "10px", fontSize: ".9rem" }}>
                  <Card.Img
                    style={{ width: "40px", height: "35px" }}
                    src={`${comment.user.image}`}
                  />
                  {comment.user.first_name} {comment.user.last_name}:{" "}
                  {comment.body}
                </Card.Text>
              );
            })
          ) : (
            <Card.Text style={{ padding: "15px" }}>
              Be the first to comment!
            </Card.Text>
          )}
          {user.length !== 0 ? (
            <Form style={{padding: '15px'}}>
              <Form.Control 
              placeholder="new comment..."
              type='text'
              ></Form.Control>
              <Button style={{ margin: "10px auto" }} type='submit'>Add Comment</Button>
            </Form>
          ) : null}
        </Card>
      </Container>
    </div>
  );
}
export default EventDetailsPage;
