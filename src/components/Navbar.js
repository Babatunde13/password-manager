import {useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
// import { Link } from 'react-router-dom'
import CreatePasswordModal from '../components/createPassword.modal'
import favicon from '../assets/favicon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCog } from '@fortawesome/free-solid-svg-icons'

const NavbarComponent = (props) => {
  const [createModalShow, setCreateModalShow] = useState(false);
  const handleHide = () => {
    let n = window.confirm("Your changes won't be saved...")
    if (n) setCreateModalShow(false)
  }

  const handleCreate = payload => {
    props.handleCreate(payload)
    setCreateModalShow(false)
  }

  return (
    <Navbar bg="light" expand="lg">
    {/* <Navbar bg="light" expand="lg" style={{ width: 400 }}> */}
      <Navbar.Brand onClick={() => {window.location.assign("/")}} style={{cursor : 'pointer'}}><img src={favicon} alt="" style={{width : '40px', height :  '40px'}}></img> Password Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {/* <Nav.Link href="#link">Link</Nav.Link> */}
          
          {!localStorage.getItem('userId')  ? 
          <>
          <NavDropdown title={<FontAwesomeIcon icon={faUserCircle} size="lg" />} alignRight id="basic-nav-dropdown">
            <NavDropdown.Item href="/login">Sign in</NavDropdown.Item>
            <NavDropdown.Item href="/register">Register</NavDropdown.Item>
          </NavDropdown>
          </>: 
          <>
          <NavDropdown title={<FontAwesomeIcon icon={faCog} size="lg" />} alignRight id="basic-nav-dropdown">
            <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
            <CreatePasswordModal show={createModalShow} onHide={handleHide} handleCreate={ handleCreate } />
            <NavDropdown.Item href="#" onClick={() => setCreateModalShow(true)}>Create New Password</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/logout"
                onClick={() => {localStorage.clear(); window.location.assign('/')}}>Logout</NavDropdown.Item>
          </NavDropdown>
          </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent

