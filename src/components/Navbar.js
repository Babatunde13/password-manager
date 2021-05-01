import {useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom'
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
      <Navbar.Brand as={Link} to="/" style={{cursor : 'pointer'}}><img src={favicon} alt="" style={{width : '40px', height :  '40px'}}></img> Password Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/" className="mt-2" style={{textDecoration : "none"}}>Home</Link>
          
          {!localStorage.getItem('userId')  ? 
          <>
          <NavDropdown title={<FontAwesomeIcon icon={faUserCircle} size="lg" />} alignRight id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/login">Sign in</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
          </NavDropdown>
          </>: 
          <>
          <NavDropdown title={<FontAwesomeIcon icon={faCog} size="lg" />} alignRight id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/dashboard">Dashboard</NavDropdown.Item>
            <CreatePasswordModal show={createModalShow} onHide={handleHide} handleCreate={ handleCreate } />
            <NavDropdown.Item to="#" onClick={() => setCreateModalShow(true)}>Create New Password</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/logout"
                >Logout</NavDropdown.Item>
          </NavDropdown>
          </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent

