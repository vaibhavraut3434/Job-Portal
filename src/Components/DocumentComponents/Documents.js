import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap-v5";
import firebase from "firebase/app";
import "firebase/storage";
import { useContext } from "react";
import AuthContext from "../HomeComponents/Auth1";

function Documents() {
 

  

  // const [selectedFile, setSelectedFile] = useState();
  // const [isFilePicked, setIsFilePicked] = useState(false);

  // const changeHandler = (event) => {
  //   setSelectedFile(event.target.files[0]);
  //   setIsFilePicked(true);
  // };
  const { currentUser } = useContext(AuthContext);
  const storage = firebase.storage();
  const [image, setImage] = useState("");
  const upload = () => {
    if (image) {
      storage
        .ref(`/images/${currentUser.email}/${image.name}`)
        .put(image)
        .on("state_changed", alert("success"), alert);
      // setSelectedFile(image);
      // setIsFilePicked(true);
    }
  };

  // const viewFiles = () => {
  //   if (currentUser) {
  //     const listRef = storage.ref(`/images/${currentUser.email}`);
  //     listRef
  //       .listAll()
  //       .then((res) => {
  //         res.prefixes.forEach((folderRef) => {
  //           //console.log(folderRef);
  //         });
  //         res.items.forEach((itemRef) => {
  //           //console.log(itemRef.name);
            
  //           transfer(itemRef.name);
  //         });
  //       })
  //       .catch((error) => {
  //         alert(error);
  //       });
  //   }
  //   console.log(imgs, "L");
  // };

  // const viewFiles1 = () => {
  //   if (currentUser) {
  //     const storageRef = storage.ref(`/images/`);
  //     storageRef
  //       .child(`${currentUser.email}/ak2.PNG`)
  //       .getDownloadURL()
  //       .then((url) => {
  //         console.log("#", url);
  //         var img1 = document.getElementById("myimg1");
  //         img1.setAttribute("href", url);
  //         var img = document.getElementById("myimg");
  //         img.setAttribute("src", url);
  //       })
  //       .catch((error) => {
  //         alert(error);
  //       });
        
  //     }
  // };

  useEffect( () =>
  {
    if (currentUser) {
      const listRef = storage.ref(`/images/${currentUser.email}`);
      listRef
        .listAll()
        .then((res) => {
          res.prefixes.forEach((folderRef) => {
            //console.log(folderRef);
          });
          res.items.forEach((itemRef) => {
            itemRef.getDownloadURL().then((url) => {
              console.log("download url : ",url)
            })
            console.log("Inside useEffect111");
            setImage(itemRef.name);
            transfer(itemRef.name);
          });
        })
        .catch((error) => {
          alert(error);
        });
        console.log("Inside useEffect");
      }
    
  }
  ,[])

  const imgs = [];
  const [ images, setImages ] = useState("asdfg");
  const transfer = (a) => {
    console.log(imgs,'#',imgs.push(a));
  };

  return (
    <div>
      <Row>
        <Col>
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>File Name</th>
                <th>Size</th>
                <th>Open</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td id="tdFileName">a</td>
                <td>
                  <img id="myimg" style={{ width: "100px", height: "100px" }} />
                </td>
                <td>
                  <a target="_blank" id="myimg1">
                    link
                  </a>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Select a document.</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Images Only
              </Card.Subtitle>
              <Card.Text>
                <input
                  type="file"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </Card.Text>
              {/* {isFilePicked ? (
                <div>
                  <p>Filename: {selectedFile.name}</p>
                  <p>Filetype: {selectedFile.type}</p>
                </div>
              ) : (
                <p>Select a file to show details</p>
              )} */}
              <div>
                <Button >View</Button>
                <Button onClick={upload}>Upload</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <h1>
          {images}
          ${imgs.name}
          {imgs[0]}
        </h1>
      </Row>
    </div>
  );
}
export default Documents;
