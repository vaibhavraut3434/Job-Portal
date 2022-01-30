import { data } from "jquery";
import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap-v5";
import { useNavigate } from "react-router-dom";
import AuthContext from "../HomeComponents/Auth1";
import firebaseConfig from "../HomeComponents/config";


const Certificates = () => {
  const initialValues = {
    course: "",
    company: "",
    credId: "",
  };

  const { currentUser } = useContext(AuthContext);
  const [form, setForm] = useState(initialValues);
  const [certData, setCertData] = useState([]);
  const [course, setCourse] = useState({});

  let navigate = useNavigate();

  if (currentUser === null) {
    navigate("/");
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createNewCertificate(form, currentUser);
  };

  const createNewCertificate = (form, currentUser) => {
    const db = firebaseConfig.database();
    db.ref(
      "user_Profiles/" + currentUser.uid + "/Certificates/"
    )
      .push(form)
      .catch(alert);
    alert("Form Submitted Successfully");
  };

  useEffect(() => {
    if (currentUser) {
      firebaseConfig
        .database()
        .ref(
          "user_Profiles/" +
            currentUser.uid +
            "/Certificates/"
        )
        .on("value", (snapshot) => {
          let certificateList = [];
          snapshot.forEach((snap) => {
            certificateList.push(snap.val());
          });
          setCertData(certificateList);
          //console.log(studentList);
        });
    }
  }, [currentUser]);

  return (
    <div>
      <Row className="justify-content-md-center">
        <h1> </h1>
      </Row>
      <Row>
        <Col md='2'></Col>
        <Col md="4">
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Issuer</th>
                <th>Id</th>
              </tr>
            </thead>
            <tbody>
              {certData.map((xx, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{xx.course}</td>
                    <td>{xx.company}</td>
                    <td>{xx.credId}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
        <Col md="6">
          <Card style={{ width: "25rem" }}>
            <Card.Header>
              <Card.Title>Enter Certificate Details</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form autoComplete="off" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name of the Course</Form.Label>
                  <Form.Control
                    required
                    maxLength={30}
                    minLength={5}
                    onChange={handleInputChange}
                    name="course"
                    id="course"
                    value={form.course}
                    type="text"
                    placeholder="Enter course name"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Issuer Company</Form.Label>
                  <Form.Control
                    required
                  
                    maxLength={20}
                    minLength={2}
                    onChange={handleInputChange}
                    name="company"
                    id="company"
                    value={form.company}
                    type="text"
                    placeholder="Enter company name"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Credential Id</Form.Label>
                  <Form.Control
                    required
                    minLength={6}
                    maxLength={8}
                    onChange={handleInputChange}
                    name="credId"
                    id="credId"
                    value={form.credId}
                    type="text"
                    placeholder="Enter Id "
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Certificates;
