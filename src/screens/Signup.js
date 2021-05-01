import {useRef, useState} from 'react'
import { createUser } from '../models';
import {useHistory} from 'react-router-dom'
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom'
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import NavbarComponent from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export default function SignIn() {
  const history = useHistory()
  if (localStorage.getItem('user')) {
    history.push('/')
  }
  const firstName= useRef('')
  const lastName= useRef('')
  const email = useRef('')
  const password = useRef('')
  const confirm_password = useRef('')
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value
    }
    if (body.firstName && body.lastName && body.password && body.email && body.password === confirm_password.current.value) {
      const user = await createUser(body.firstName, body.lastName, body.email, body.password)
      if (!user) {
        alert('Email has been chosen')
      } else {
        localStorage.setItem('userId', user.id)
        localStorage.setItem('email', user.email)
        history.push('/')
        alert('Account created sucessfully, signing you in...')
      }
    } else if (!body.firstName || !body.email || !body.lastName || !body.password || (body.password !== confirm_password.current.value)) {
      setValidated(true)
    } else {
      alert('Password and confirm password fields must be equal')
    }
  }
  
  return (
    <>
      <NavbarComponent />
      <Container className='d-flex flex-column align-items-center justify-content-center pt-5' style={{height : '80vh'}}>
        <p className="h3 display-4 mt-5"><FontAwesomeIcon icon={faUserCircle} size="lg" /></p>
        <p className="h2 display-5">Register</p>
        <Form noValidate validated={validated} onSubmit={handleSubmit} style={{minWidth : '300px' }}>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                ref={firstName}
                type="text"
                placeholder="First name"
              />
              <Form.Control.Feedback type="invalid">Please provide an email.</Form.Control.Feedback>
              <Form.Control.Feedback>Great name!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                ref={lastName}
                type="text"
                placeholder="Last name"
              />
              <Form.Control.Feedback type="invalid">Please provide your last email.</Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                aria-describedby="inputGroupPrepend"
                required
                ref={email}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a valid email.
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required ref={password} />
              <Form.Control.Feedback type="invalid">
                Please provide a password between 8 and 20.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom04">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" required ref={confirm_password} />
              <Form.Control.Feedback type="invalid">
                Fields do not match.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
            />
          </Form.Group>
          <Button type="submit">Register</Button>
          <p className="text-center"><Link to="/login">Sign in</Link> if already registered!</p>
        </Form>
      </Container>
    </>
  )
}
