
import Modal from 'react-bootstrap/Modal'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PreviewPasswordModal = props  => {
    const [password, setPassword] = useState("*"*props.password.length)
    return <Modal
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
          <Row>
            <Col>
              <div>{props.accountName}</div>
            </Col>
            <Col>
              <div>{props.accountUrl}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>{props.email}</div>
            </Col>
            <Col>
              <div>{password} <Button onClick={() => {setPassword(props.password)}}>Preview</Button></div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    <Modal.Footer>
        <Button onClick={props.onEdit}>Edit</Button>
        <Button variant="danger" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
}

export default PreviewPasswordModal