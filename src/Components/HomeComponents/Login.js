import React, { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap-v5";
import { useNavigate } from "react-router-dom";
//import { login } from "./Auth";
import  AuthContext  from "./Auth1";
import firebaseConfig from "./config";

const Login = () => {
  let navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    //await login(form);
    try {
      firebaseConfig
        .auth()
        .signInWithEmailAndPassword(form.email, form.password)
        .then((userCredential) => {
          var user = userCredential.user;
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage)
        });
    } catch (error) {
      alert(error);
    }
  };

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    navigate('/profile');
  }

  return (
    <div>
      <Card border="primary" style={{ width: "25rem" }}>
        <Card.Body>
          <Form autoComplete="off" onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                id="email"
                type="email"
                placeholder="Enter email"
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                }}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                }}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              {/* <Form.Check type="checkbox" label="Check me out" /> */}
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
