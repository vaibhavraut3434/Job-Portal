import React, { Component } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Table,
  ProgressBar,
} from "react-bootstrap-v5";
import { useNavigate } from "react-router-dom";
import AuthContext from "../HomeComponents/Auth1";
import firebaseConfig from "../HomeComponents/config";

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: [],
      name: [],
      progress: 0,
      tempUser: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.listFiles = this.listFiles.bind(this);
    //this.handleUpload(this);
  }
  handleChange = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = (temp) => {
    const { image } = this.state;
    const storage = firebaseConfig.storage();
    const uploadTask = storage
      .ref(`images/` + temp + `/${image.name}`)
      .put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
        
      },
      (error) => {
        console.log(error);
      }
    );
    
  };

  listFiles = (userUID) => {
    const storage = firebaseConfig.storage();
    const listRef = storage.ref(`/images/` + userUID);
    listRef
      .listAll()
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          //console.log(folderRef);
        });
        res.items.forEach((itemRef) => {
          itemRef.getDownloadURL().then((urlx) => {
            this.setState({ url: [...this.state.url, urlx] });
            this.setState({ name: [...this.state.name, itemRef.name] });
            //console.log(itemRef);
          });
        });
      })
      .catch((error) => {
        alert(error);
      });
      
  };

  static contextType = AuthContext;

  componentDidMount() {
    const user = this.context;
    if (user.currentUser === null) {
      alert("Please Login First");
      this.props.navi('/');
    } 
    else {
      this.listFiles(user.currentUser.uid);
      this.setState({ tempUser: user.currentUser.uid });
    }
  }

  render() {
    return (
      <div>
          <Row>
              <h1></h1>
          </Row>
          <Row>
              <h1></h1>
          </Row>
        <Row className="justify-content-md-center">
            <Col md='2'></Col>
          <Col md="4">
            <Table responsive striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>File Name</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {this.state.url.map((e, index) => {
                  return (
                    <tr key={e}>
                      <td>{index + 1}</td>
                      <td>{this.state.name[index]}</td>
                      <td>
                        <a href={this.state.url[index]} target="_blank">
                          go to file
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col md='1'></Col>
          <Col md="5">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>Select a File</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <ProgressBar
                    striped
                    variant="warning"
                    value={this.state.progress}
                    now={this.state.progress}
                    max="100"
                  />
                  
                </Card.Subtitle>
                <Card.Text>
                  <Form.Control type="file" onChange={this.handleChange} />
                </Card.Text>
                <Card.Text>
                  <Button
                    onClick={this.handleUpload.bind(this, this.state.tempUser)}
                  >
                    Upload
                  </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Test;
