import {useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import CreatePasswordModal from '../components/createPassword.modal'

const NavbarComponent = (props) => {
  const [createModalShow, setCreateModalShow] = useState(false);
  const handleHide = () => {
    let n = window.confirm("Your changes won't be saved...")
    if (n) setCreateModalShow(false)
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand>
        <Button onClick={() => {window.location.assign("/")}} style={{listStyle: 'none', color: 'white'}}>Home</Button>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form> 
          <Navbar.Brand>
          <Button onClick={() => {window.location.assign("/dashboard")}} style={{listStyleType: 'none', color: 'white'}}>Dashboard</Button>
          </Navbar.Brand>
          {props.onCreate &&
          <>
            <Button variant="primary" onClick={() => setCreateModalShow(true)}>
              Create New Password
            </Button>
            <CreatePasswordModal
              show={createModalShow}
              onHide={handleHide}
              onCreate ={(payload) => {props.onCreate(payload); setCreateModalShow(false)}}
            />
          </>}
        </Nav>
      </Navbar>
    </>
  )
}

export default NavbarComponent
