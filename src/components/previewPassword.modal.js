
import Modal from 'react-bootstrap/Modal'
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PreviewContactModal = props  => (
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
          <Row>
            <Col>
                <img src={props.avatar} alt=""/>
              </Col>
          </Row>
          <Row>
            <Col>
              <div>{props.firstname}</div>
            </Col>
            <Col>
              <div>{props.lastname}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>{props.email}</div>
            </Col>
            <Col>
              <div>{props.phone}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>{props.address}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>{props.company}</div>
            </Col>
            <Col>
              <div>{props.jobtitle}</div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    <Modal.Footer>
        <Button onClick={props.onEdit}>Edit</Button>
        <Button variant="danger" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );

export default PreviewContactModal