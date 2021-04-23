import {useRef, useState} from 'react'
import { useHistory } from 'react-router-dom';
import {loginUser} from '../models'
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export default function SignIn() {
  let history = useHistory()
  const [validated, setValidated] = useState(false);

  if (localStorage.getItem('userId')) {
  history.push('/') 
  }
  const email = useRef('')
  const password = useRef('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      email: email.current.value,
      password: password.current.value
    }
    // Handle login logic
    if (!body.email || !body.password) {
      alert('You need to input an email and password')
    } else {
      const user = await loginUser(body.email, body.password)
      console.log(user)
      if (user) {
        localStorage.setItem('userId', user.id)
        localStorage.setItem('email', user.email)
        history.push('/')
      } else {
        alert('Invalid email or password')
      }
    }
  }
  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            ref={email}
            type="email"
            placeholder="Email"
          />
          <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="6" controlId="validationCustom02">
          <Form.Label>Looks good!</Form.Label>
          <Form.Control
            required
            ref={password}
            type="password"
            placeholder="Password"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
    </Form>
  )
}