
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

const CreateContactModal = (props)  => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('') 
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('') 
  const [jobTitle, setJobTitle] = useState('') 
  const [phone, setPhone] = useState('') 
  const [address, setAddress] = useState('')
  const [avatar, setAvatar] = useState('')

  const onCreate = () => {
    const payload = {
      firstName,
      lastName,
      email,
      company,
      jobTitle,
      phone, 
      address,
      avatar
    }
    // save to db
    // add to DOM
    props.onCreate(payload)
  }

  const onHide = () => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setJobTitle('')
    setAvatar('')
    setAddress('')
    setCompany('')
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
          Create New Contact
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Form>
            <Row>
              <Form.Group as={Col}>
                  <Form.Control type="file" value={avatar} onChange={(e) => {setAvatar(e.target.files[0])}} />
                </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Control placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Control type="phone" placeholder="Phone number(+2348180854296)" value={phone} onChange={(e) => setPhone(e.target.value)}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Control placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Control placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control placeholder="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)}/>
              </Form.Group>
            </Row>
          </Form>
        </Container>
      </Modal.Body>
    <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>Close</Button>
        <Button variant="success" onClick={onCreate} disabled={(!firstName || !lastName || !phone) ? true : false}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default CreateContactModal