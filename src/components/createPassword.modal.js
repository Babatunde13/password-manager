
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

const CreatePasswordModal = (props)  => {
  const [accountName, setAccountName] = useState('')
  const [accountUrl, setAccountUrl] = useState('') 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 

  const onCreate = () => {
    const payload = {
      accountName,
      accountUrl,
      email,
      password
    }
    // save to db
    // add to DOM
    props.onCreate(payload)
  }

  const onHide = () => {
    setAccountName('')
    setAccountUrl('')
    setEmail('')
    setPassword('')
    props.onHide()
  }

  return (
    <Modal
      {...props}
      size="xlg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create New Password
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
        <Button variant="success" onClick={onCreate} disabled={(!accountUrl || !accountName || !email) ? true : false}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default CreatePasswordModal