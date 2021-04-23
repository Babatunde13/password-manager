import {useState} from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import CreatePasswordModal from '../components/createPassword.modal'

const NavbarComponent = (props) => {
  const [createModalShow, setCreateModalShow] = useState(false);
  const handleHide = () => {
    let n = window.confirm("Your changes won't be saved...")
    if (n) setCreateModalShow(false)
  }

  return (
    <Navbar collapseOnSelect className="justify-content-between" expand="sm" bg="primary" variant="pill">
      <Navbar.Brand>
        <Button onClick={() => {window.location.assign("/")}} style={{listStyle: 'none', color: 'white'}}>Home</Button>
      </Navbar.Brand>
      <Nav className="justify-content-end" activeKey="/home">
        {!localStorage.getItem('userId')  ? 
          <>
            <Nav.Link variant="primary" style={{listStyleType: 'none', color: 'white', padding: '5px'}} onClick={() => setCreateModalShow(true)}>
              Create New Password
            </Nav.Link>
            <CreatePasswordModal
              show={createModalShow}
              onHide={handleHide}
              onCreate ={(payload) => {props.onCreate(payload); setCreateModalShow(false)}}
            />
            <Nav.Item style={{padding: '5px'}}>
              <Link to="/login" style={{listStyleType: 'none', color: 'white'}}>Login</Link>
            </Nav.Item>
            <Nav.Item style={{padding: '5px'}}>
              <Link to="/register" style={{listStyleType: 'none', color: 'white'}}>Register</Link>
            </Nav.Item>
          </> : 
          <>
            <Nav.Item style={{padding: '5px'}}>
              <Link to="/dashboard" style={{listStyleType: 'none', color: 'white'}}>Dashboard</Link>
            </Nav.Item>
            <Nav.Item style={{padding: '5px'}}>
              <Link to="/logout" style={{listStyleType: 'none', color: 'white'}}>Logout</Link>
            </Nav.Item>
        </>
        }
        </Nav>
      </Navbar>
  )
}

export default NavbarComponent
