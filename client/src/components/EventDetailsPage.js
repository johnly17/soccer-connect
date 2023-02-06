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
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userRSVP, setUserRSVP] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/events/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setEventDetail(data);
        setAttendingUsers(data.attending_users);
        setComments(data.comments);
      });
  }, [id]);

  function handleRSVP(e) {
    e.preventDefault();
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
          setUserRSVP(true);
        });
      }
    });
  }

  function handleDeleteRSVP(e) {
    e.preventDefault();
    fetch(`/attendances`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setAttendingUsers(attendingUsers.filter(user => user !== data.id));
          setUserRSVP(false);
        });
      }
    });
  }

  function handleNewComment(e) {
    e.preventDefault();
    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        event_id: eventDetail.id,
        body: newComment,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setComments([...comments, data]);
        });
      }
    });
  }
  // console.log(eventDetail)
  // console.log(user);
  // console.log(attendingUsers)
  console.log(userRSVP)

  //need two functions that posts user RSVP to attendances and a function that deletes user RSVP to attendances
  //need function that allows users to delete their comments

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
                {user.length !== 0 ? (
                  <Button
                    variant="primary"
                    type="submit"
                    href={`/event/${id}}`}
                  >
                    {userRSVP ? (
                      <Button onClick={handleDeleteRSVP}>Un-RSVP</Button>
                    ) : (
                      <Button onClick={handleRSVP}>RSVP</Button>
                    )}
                  </Button>
                ) : (
                  <Button href="/login" variant="success">
                    Log in to RSVP!
                  </Button>
                )}
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
      <Container style={{ marginTop: "30px", width: "35%" }}>
        <Card>
          <Card.Header>Comments</Card.Header>
          {comments?.length > 0 ? (
            comments.map((comment) => {
              return (
                <Card.Text style={{ paddingTop: "10px", fontSize: ".9rem" }}>
                  <Container style={{ display: "flex", alignItems: "center" }}>
                    <Card.Img
                      style={{ width: "40px", height: "35px" }}
                      src={`${comment.user.image}`}
                    />
                    {comment.user.first_name} {comment.user.last_name}:{" "}
                    {comment.body}
                    {comment.user.id === user.id ? (
                      <Button
                        style={{
                          backgroundColor: "white",
                          border: "0",
                          marginLeft: "10px",
                        }}
                      >
                        🗑️
                      </Button>
                    ) : null}
                  </Container>
                </Card.Text>
              );
            })
          ) : (
            <Card.Text style={{ padding: "15px" }}>
              Be the first to comment!
            </Card.Text>
          )}
          {user.length !== 0 ? (
            <Form style={{ padding: "15px" }} onSubmit={handleNewComment}>
              <Form.Control
                placeholder="new comment..."
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></Form.Control>
              <Button style={{ margin: "10px auto" }} type="submit">
                Add Comment
              </Button>
            </Form>
          ) : null}
        </Card>
      </Container>
      <div style={{ margin: "30px auto 0 auto", textAlign: "center" }}>
        {user.first_name === eventDetail.user?.first_name ? (
          <Button variant="danger" className="text-center">
            Delete Event
          </Button>
        ) : null}
      </div>
    </div>
  );
}
export default EventDetailsPage;
