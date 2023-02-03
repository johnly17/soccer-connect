import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user);
          navigate("/events");
        });
      } else {
        r.json().then((data) => setLoginError(data.error));
      }
    });
  }

  return (
    <div className="login-page">
      <h1
        className="text-center"
        style={{ margin: "0px 0 -40px 0", paddingTop: "40px" }}
      >
        Welcome Back!
      </h1>
      <Card style={{ width: "50%", margin: "100px auto", padding: "20px" }}>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Row>
            <Col>
              <Button style={{ width: "80%", marginTop: "10px" }} type="submit">
                Log In
              </Button>
            </Col>
            <Col>
              <p style={{width: '100%', padding: '5px 0 0 0'}}>
                Don't have an account yet?{" "}
                <a href="/signup">Create a Soccer Connect account here!</a>
              </p>
            </Col>
          </Row>
        </Form>
      </Card>
      {loginError && (
        <div>
          <h1
            style={{
              margin: "100px auto 0 auto",
              textAlign: "center",
              color: "red",
            }}
          >
            {loginError}
          </h1>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
