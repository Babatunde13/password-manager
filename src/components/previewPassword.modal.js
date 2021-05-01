import { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import FormControl from 'react-bootstrap/FormControl'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditPasswordModal from "./editPassword.modal";
import web from '../assets/web.png';
// import eye from '../assets/eye.png';

const PreviewPasswordModal = props  => {
    const [passwordType, setPasswordType] = useState('password')
    return <Modal
      {...props}
      size="xlg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <img src={web} alt=""/> {props.accountName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col>
              <div><a href={props.accountUrl} rel="noreferrer" target="_blank"><small>{props.accountName}</small></a></div>
            </Col>
            <Col>
              <div><FormControl type="text" style={{width: '18em', padding: '20px', margin: '5px'}} value={props.email} readOnly/></div>
              <div>
                <FormControl type={passwordType} style={{width: '18em', padding: '20px', margin: '5px'}} value={props.password} readOnly/>
                <Button className="m-1" onClick={() => {setPasswordType(passwordType === "password"? "text" : "password")}}>{passwordType === "password"? "Preview Password": "Hide"}</Button>
                <Button className="m-1" onClick={() => {
                  var passwordText = document.createElement('textarea')
                  passwordText.innerText = props.password
                  document.body.appendChild(passwordText)
                  passwordText.select()
                  document.execCommand('copy')
                  passwordText.remove()
                }}>Copy</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    <Modal.Footer>
        <Button onClick={props.onEdit}>Edit</Button>
        <Button variant="danger" onClick={props.onDelete}>Delete</Button>
      </Modal.Footer>
      <EditPasswordModal
          id={props.id}
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