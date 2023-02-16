import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import Comments from "./Comments";

function EventDetailsPage({ user, events, loading, deleteEvent }) {
  const [eventDetail, setEventDetail] = useState([]);
  const [attendances, setAttedances] = useState([]);
  const [attendingUsers, setAttendingUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userRSVP, setUserRSVP] = useState(false);
  const [show, setShow] = useState(false);
  const [editting, setEditting] = useState(false);
  const [editName, setEditName] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [editWhen, setEditWhen] = useState('')
  const [editTime, setEditTime] = useState('')
  const [editAddress, setEditAddress] = useState('')
  const [editCity, setEditCity] = useState('')
  const [editState, setEditState] = useState('')
  const [editZipcode, setEditZipcode] = useState(null)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    fetch(`/events/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setEventDetail(data);
        setAttendingUsers(data.attending_users);
        setComments(data.comments);
        setEditName(data.name)
        setEditDesc(data.description)
        setEditWhen(data.date)
        setEditTime(data.time)
        setEditAddress(data.address)
        setEditCity(data.city)
        setEditState(data.state)
        setEditZipcode(data.zipcode)
      });
  }, [id]);

  useEffect(() => {
    fetch("/attendances")
      .then((r) => r.json())
      .then((data) => setAttedances(data));
  }, []);

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
          setUserRSVP(true);
        });
      }
    });
  }
  function handeDeleteEvent() {
    fetch(`/events/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((data) => {
        deleteEvent(data);
      });
  }
  function handleNewComment(e) {
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
          setNewComment("");
        });
      }
    });
  }

  function handleEventEdit(e) {
    e.preventDefault();
    fetch(`/events/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editName,
        address: editAddress,
        city: editCity,
        state: editState,
        zipcode: editZipcode,
        time: editTime,
        date: editWhen,
        description: editDesc
      })
    })
    .then(r => {
      if (r.ok) {
        r.json().then(data => {
          setEventDetail(data);
          nav(`/events`)
        })
      } else {
        r.json().then(data => {
          console.log(data.error)
        })
      }
    })
  }


  const commentList = comments?.map((comment) => {
    return (
      <Comments
        id={comment.id}
        comment={comment}
        comments={comments}
        setComments={setComments}
        eventDetail={eventDetail}
        user={user}
        eventID={eventDetail.id}
        loading={loading}
      />
    );
  });

  const isAttending = attendingUsers.some((attender) => {
    return attender.first_name === user.first_name;
  });

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      {editting ? (
        <Card style={{ width: "50%", margin: "0 auto", marginTop: "80px" }}>
          <Card.Header>Update Event Info:</Card.Header>
          <Form style={{ padding: "20px" }} onSubmit={handleEventEdit}>
            <Form.Label>Event Name:</Form.Label>
            <Form.Control value={editName} onChange={(e) => setEditName(e.target.value)}/>
            <Form.Label>Description:</Form.Label>
            <Form.Control placeholder={eventDetail.description} value={editDesc} onChange={(e) => setEditDesc(e.target.value)}/>
            <Form.Label>When:</Form.Label>
            <Form.Control type='date' placeholder={eventDetail.date} value={editWhen} onChange={(e) => setEditWhen(e.target.value)}/>
            <Form.Label>Time:</Form.Label>
            <Form.Control type='time' placeholder={eventDetail.time} value={editTime} onChange={(e) => setEditTime(e.target.value)}/>
            <Form.Label>Address:</Form.Label>
            <Form.Control placeholder={eventDetail.address} type='text' value={editAddress} onChange={(e) => setEditAddress(e.target.value)}/>
            <Form.Label>City:</Form.Label>
            <Form.Control placeholder={eventDetail.city} type='text' value={editCity} onChange={(e) => setEditCity(e.target.value)}/>
            <Form.Label>State:</Form.Label>
            <Form.Control placeholder={eventDetail.state} type='text' value={editState} onChange={(e) => setEditState(e.target.value)}/>
            <Form.Label>Zipcode:</Form.Label>
            <Form.Control type='number' value={editZipcode} onChange={(e) => setEditZipcode(e.target.value)}/>
          <Container style={{marginBottom: '10px', marginTop: '10px'}}>
            <Button variant='warning' href={`/event/${id}`} style={{marginRight: '5px'}}>Cancel</Button>
            <Button type='submit' variant='success'>Save</Button>
          </Container>
          </Form>
        </Card>
      ) : (
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
                    <strong>Hosted By:</strong>
                    {user.first_name === eventDetail.user?.first_name
                      ? " You"
                      : ` ${eventDetail.user?.first_name}
                ${eventDetail.user?.last_name}`}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{eventDetail?.name}</Card.Title>
                    <Card.Text>{eventDetail?.description}</Card.Text>
                    <Row>
                      <Col>
                        <Card.Text>
                          <strong>When:</strong> {eventDetail?.date}
                        </Card.Text>
                      </Col>
                      <Col>
                        <Card.Text>
                          <strong>Time:</strong> {eventDetail?.time}
                        </Card.Text>
                      </Col>
                    </Row>
                    <Card.Text>
                      <strong>Where:</strong> {eventDetail?.address},{" "}
                      {eventDetail?.city}, {eventDetail?.state}{" "}
                      {eventDetail?.zipcode}
                    </Card.Text>
                    {user.length !== 0 ? (
                      <Button
                        style={{ background: "white", border: "0" }}
                        type="submit"
                      >
                        {isAttending ? (
                          <Button onClick={handleShow} variant="success">
                            RSVP'd!
                          </Button>
                        ) : (
                          <Button href={`/event/${id}}`} onClick={handleRSVP}>
                            RSVP
                          </Button>
                        )}
                      </Button>
                    ) : (
                      <Button href="/login" variant="success">
                        Log in to RSVP!
                      </Button>
                    )}

                    <Modal show={show} onHide={handleClose}>
                      <Modal.Body className="text-center">
                        Hey! You've already RSVP'd!
                      </Modal.Body>
                      <Button
                        onClick={handleClose}
                        style={{ width: "20%", margin: "10px auto" }}
                      >
                        Close
                      </Button>
                    </Modal>
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
              {/* <Comments comments={comments} setComments={setComments} eventDetail={eventDetail} user={user}/> */}
              {commentList}
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
              <div>
                <Button
                  style={{ marginRight: "10px" }}
                  onClick={() => setEditting(true)}
                >
                  Edit
                </Button>
                <Button
                  href="/find-events"
                  variant="danger"
                  className="text-center"
                  onClick={handeDeleteEvent}
                >
                  Delete Event
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
export default EventDetailsPage;
