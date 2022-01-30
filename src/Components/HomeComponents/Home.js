import React from "react";
import { Col, Row } from "react-bootstrap-v5";
import Login from "./Login";
import Register from "./Register";

const Home = () => {
  return (
    <div>
      <Row>
        <h1></h1>
      </Row>
      <Row>
        <Col>
          <Register />
        </Col>
        <Col>
          <Login />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
