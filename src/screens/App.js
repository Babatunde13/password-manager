import { useState, useEffect } from 'react'
import Card from "react-bootstrap/Card";
import { getPasswordsByUserID, createPassword } from "../models";
import 'bootstrap/dist/css/bootstrap.min.css';
import Passwords from '../components/Passwords';
import NavbarComponent from '../components/Navbar';

const AppDashboard = () => {
  const [passwords, setPasswords] = useState([])
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    setIsPending(true)
    const getContacts = async () => {
      setPasswords(getPasswordsByUserID(localStorage.getItem('userId')))
    }
    getContacts()
    setIsPending(false)
  }, [])

  return (
   <>
      <NavbarComponent 
        passwords={ passwords} 
        onCreate={ async(password) => {
          //  save to dB
          password.userId = localStorage.getItem('userId')
          const newPassword = await createPassword(
            password.accountName, 
            password.accountUrl,
            password.password,
            password.userId)
          console.log(passwords)
          console.log(newPassword)
          setPasswords([newPassword])
          alert('New contact created successfully')
        }
      }/>

      <Card>

      </Card>
      {isPending && 'Fetching Passwords...'}
      {passwords.length === 0 ? 
      <Passwords 
        passwords={passwords}
        handleEdit={(payload) => {
          // create an edit Modal
          console.log(payload)
            setPasswords(passwords.map( password => password.id === payload.id? payload : password))
            console.log(passwords.map( password => password.id === payload.id? payload : password))
        }}
        handleDelete={(id) => {
          setPasswords(passwords.filter( ele =>  ele.id !== id)) 
        }}  
      /> : <Card>You haven't created any password</Card>}
   </>
  );
}

export default AppDashboard;
