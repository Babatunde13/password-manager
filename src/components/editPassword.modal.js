
import Modal from 'react-bootstrap/Modal'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fa } from '@fortawesome/free-brands-svg-icons'
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const EditPasswordModal = props  => {
  const [accountName, setAccountName] = useState(props.accountName)
  const [accountUrl, setAccountUrl] = useState(props.accountUrl) 
  const [email, setEmail] = useState(props.email)
  const [password, setPassword] = useState(props.password) 
  

  const onEdit = () => {
    const payload = {
      accountName,
      accountUrl,
      email,
    }
    console.log(payload)
    // save to db
    // add to DOM
    props.onEdit(payload)
  }

  return (
    <Modal
      {...props}
      size="xlg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Form>
            <Row>
              <Form.Group as={Col}>
                <Form.Control placeholder="Account Name" value={accountName} onChange={(e) => setAccountName(e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control placeholder="Account URL" value={accountUrl} onChange={(e) => setAccountUrl(e.target.value)}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Control type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Control type="phone" value={password} placeholder="******" onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
            </Row>
          </Form>
        </Container>
      </Modal.Body>
    <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>Close</Button>
        <Button variant="success" onClick={onEdit} disabled={(!accountUrl || !accountName || !email) ? true : false}>Edit</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default EditPasswordModal