import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditPasswordModal from "./editPassword.modal";

const PreviewPasswordModal = props  => {
    const [password, setPassword] = useState("*".repeat(props.password.length))
    return <Modal
      {...props}
      size="xlg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.accountName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col>
              <div><Link to={props.accountUrl} target="_blank"><small>{props.accountName}</small></Link></div>
            </Col>
            <Col>
              <div><Form.Control type="text" value={props.email} disabled/></div>
              <div>{password} <Button onClick={() => {setPassword(password === props.password? "*".repeat(props.password.length) : props.password)}}>{password === props.password? "Hide": "Preview"}</Button></div>
            </Col>
          </Row>

        </Container>
      </Modal.Body>
    <Modal.Footer>
        <Button onClick={props.onEdit}>Edit</Button>
        <Button variant="danger" onClick={props.onDelete}>Delete</Button>
        <Button variant="danger" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      <EditPasswordModal
          show={props.editModal}
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