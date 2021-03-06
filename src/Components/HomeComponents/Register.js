import React, { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap-v5";
import firebaseConfig from "./config";

const Register = () => {
  const initialFieldValues = {
    email: "",
    password: "",
    fullName: "",
    gender: "",
    dob: "",
    mob: "",
    city: "",
    edu: "",
  };

  var [values, setValues] = useState(initialFieldValues);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (name === "email") {
      setForm({
        ...form,
        [name]: value,
      });
    }
    if (name === "password") {
      setForm({
        ...form,
        [name]: value,
      });
    }
  };

  const createUser = (values, uid) => {
    const db = firebaseConfig.database();
    db.ref("user_Profiles/" + uid)
      .set(values)
      .catch(alert);
    alert("Form Submitted Successfully");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      firebaseConfig
        .auth()
        .createUserWithEmailAndPassword(form.email, form.password)
        .then((userCredential) => {
          var user = userCredential.user;
          createUser(values, user.uid);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <h1></h1>
      <Row className="justify-content-md-center">
        <Card border="primary" style={{ width: "30rem" }}>
          <Card.Body>
            <Form onSubmit={handleFormSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Your Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Enter your full name..."
                  value={values.fullName}
                  onChange={handleInputChange}
                  required
                  minLength={5}
                  maxLength={50}
                  pattern="[A-Za-z]{50}"
                />
              </Form.Group>

              <Row className="mb-3">
                <Form.Group as={Col} className="mb-3">
                  <div>
                    <Form.Label>Gender</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        defaultChecked
                        defaultValue={"Male"}
                        label="Male"
                        name="gender"
                        type="radio"
                        id="gender"
                        value="Male"
                        onChange={handleInputChange}
                        required
                      />
                      <Form.Check
                        inline
                        label="Female"
                        name="gender"
                        type="radio"
                        id="gender"
                        value="Female"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>DOB</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    id="dob"
                    values={values.dob}
                    onChange={handleInputChange}
                    required
                    max="2022-01-31"
                  />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Mobile No.</Form.Label>
                  <Form.Control
                    type="tel"
                    minLength={10}
                    name="mob"
                    id="mob"
                    value={values.mob}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]{10}"
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    id="city"
                    value={values.city}
                    onChange={handleInputChange}
                    required
                    minLength={3}
                    maxLength={20}
                    pattern="[A-Za-z]{20}"
                  />
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Education</Form.Label>
                  <Form.Select
                    
                    name="edu"
                    id="edu"
                    value={values.edu}
                    onChange={handleInputChange}
                    required
                    defaultValue="Choose..."
                  >
                    <option>Choose...</option>
                    <option>BE</option>
                    <option>MS</option>
                    <option>ME</option>
                    <option>Diploma</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Button variant="primary" type="submit">
                Sign up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </div>
  );
};

export default Register;
