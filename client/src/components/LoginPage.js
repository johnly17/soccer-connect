import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FormGroup from "react-bootstrap/FormGroup";

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
    <div>
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
          <Button style={{ width: "20%", marginTop: "10px" }} type='submit'>Log In</Button>
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
