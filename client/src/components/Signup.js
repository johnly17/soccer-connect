import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from 'react-bootstrap/Alert';


import { useState } from "react";
import { useNavigate } from 'react-router-dom'

function Signup({ setUser }) {
  const [firsName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [signupErrors, setSignupErrors] = useState("");

  const nav = useNavigate()

  function handleSignUp(e) {
    e.preventDefault();

    fetch("/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: firsName,
        last_name: lastName,
        password: password,
        email: email,
        image: image,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          // setUser(data);
          nav('/login')
        });
      } else {
        r.json().then((data) => {
          setSignupErrors(Object.entries(data.errors));
        });
      }
    });
  }

  return (
    <div className="login-page">
      <h1
        className="text-center"
        style={{ margin: "0px 0 -60px 0", paddingTop: "40px" }}
      >
        Enter info here!
      </h1>
      <Card
        style={{
          width: "50%",
          margin: "100px auto",
          marginBottom: '10px',
          padding: "15px",
          borderRadius: "10px",
        }}
        className="shadow-lg"
      >
        <Form onSubmit={handleSignUp}>
          <Form.Control
            style={{ margin: "10px 0" }}
            type="text"
            placeholder="First Name"
            value={firsName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
          <Form.Control
            style={{ margin: "10px 0" }}
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
          <Form.Control
            style={{ margin: "10px 0" }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <Form.Control
            style={{ margin: "10px 0" }}
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          <Form.Control
            style={{ margin: "10px 0" }}
            type="text"
            placeholder="Profile Image Link"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
          <Row>
            <Col>
              <Button style={{ width: "80%", marginTop: "5px" }} type="submit">
                Sign Up
              </Button>
            </Col>
            <Col>
              <p>
                Already have an account? <a href="/login">Log in here!</a>
              </p>
            </Col>
          </Row>
        </Form>
      </Card>
      {signupErrors
        ? signupErrors.map((e) => (
            <div style={{marginTop: '5px'}}>
              <Alert variant='danger' style={{ textAlign: "center", color: "red", width: '30%', margin: '0 auto' }}>{e[1]}</Alert>
            </div>
          ))
        : null}
    </div>
  );
}

export default Signup;
