import React, { useEffect, useState } from "react";
import { useContext } from "react";
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap-v5";
import { useNavigate } from "react-router-dom";
import AuthContext from "../HomeComponents/Auth1";
import firebaseConfig from "../HomeComponents/config";



const Profile = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    email: "Your Email",
    password: "",
    fullName: "Your Name",
    gender: "Gender",
    dob: "Date of Birth",
    mob: "Mobile No.",
    city: "City",
    edu: "Highest Qualification"
  });
  

  const storeUserData = (obj) => {
    setUser({
        ...user,
        email:obj.email,
        password:obj.password,
        fullName: obj.fullName,
        gender: obj.gender,
        dob: obj.dob,
        mob: obj.mob,
        city: obj.city,
        edu: obj.edu
    });
  };

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    
    if(currentUser) {
    const db = firebaseConfig.database();
    const dataRef = db.ref("user_Profiles/" + currentUser.uid);
    dataRef.on("value", (snapshot) => {
      const data = snapshot.val();
      storeUserData(data);
    });}
  },[currentUser]);

  return (
    <div>
      <Row>
        <h1></h1>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="4">
          <Card>
            <Card.Header as="h5">My Profile</Card.Header>
            <Card.Body>
              <Card.Title>{user.fullName}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>{user.gender}</ListGroupItem>
              <ListGroupItem>{user.dob}</ListGroupItem>
              <ListGroupItem>{user.city}</ListGroupItem>
              <ListGroupItem>{user.mob}</ListGroupItem>
              <ListGroupItem>{user.edu}</ListGroupItem>
            </ListGroup>
            
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
