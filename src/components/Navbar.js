import {useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
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
        <Navbar.Brand>
          <Button onClick={() => {window.location.assign("/dashboard")}} style={{listStyleType: 'none', color: 'white'}}>Dashboard</Button>
        </Navbar.Brand>
        {localStorage.getItem('userId') &&
        <>
          <Navbar.Brand>
            <Button onClick={() => {window.location.assign("/login")}} style={{listStyleType: 'none', color: 'white'}}>Login</Button>
          </Navbar.Brand>
          <Navbar.Brand>
            <Button onClick={() => {window.location.assign("/register")}} style={{listStyleType: 'none', color: 'white'}}>Register</Button>
          </Navbar.Brand>
        </>
        }
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
