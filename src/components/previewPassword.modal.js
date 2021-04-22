import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import FormControl from 'react-bootstrap/FormControl'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditPasswordModal from "./editPassword.modal";
import url from '../assets/url.png';

const PreviewPasswordModal = props  => {
    const [passwordType, setPasswordType] = useState('password')
    return <Modal
      {...props}
      size="xlg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      <Button variant="danger" onClick={props.onHide}>Close</Button>
        <Modal.Title id="contained-modal-title-vcenter">
          <img src={url} alt=""/> {props.accountName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col>
              <div><Link to={props.accountUrl} target="_blank"><small>{props.accountName}</small></Link></div>
            </Col>
            <Col>
              <div><FormControl type="text" style={{width: '18em', padding: '20px', margin: '5px'}} value={props.email} disabled/></div>
              <div>
                <FormControl type={passwordType} style={{width: '18em', padding: '20px', margin: '5px'}} value={props.password} disabled/>
                <Button onClick={() => {setPasswordType(passwordType === "password"? "text" : "password")}}>{passwordType === "password"? "Preview": "Hide"}</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    <Modal.Footer>
      {console.log(props.edit)}
        <Button onClick={props.onEdit}>Edit</Button>
        <Button variant="danger" onClick={props.onDelete}>Delete</Button>
      </Modal.Footer>
      <EditPasswordModal
          show={props.edit}
          editPassword={props.editPassword}
          onEdit={props.onEdit}
          accountName={props.accountName}
          accountUrl={props.accountUrl}
          email={props.email}
          password={props.password}
          title={"Edit Password for "+props.accountName}
          onHide={props.onHideEdit}
        />
    </Modal>
}

export default PreviewPasswordModal