import { useState, useEffect } from 'react'
import Card from "react-bootstrap/Card";
import { getPasswordsByUserID } from "../models";
import data from '../data'
import 'bootstrap/dist/css/bootstrap.min.css';
import Passwords from '../components/Passwords';
import NavbarComponent from '../components/Navbar';

const AppDashboard = () => {
  const [passwords, setPasswords] = useState([])
  const [isPending, setIsPending] = useState(false)

  useEffect(() => {
    setIsPending(true)
    const getContacts = () => {
      return getPasswordsByUserID(localStorage.getItem('userId'))
    }
    setPasswords(getContacts())
    setIsPending(false)
  }, [])
  console.log(passwords)

  return (
   <>
      <NavbarComponent 
        passwords={ passwords} 
        onCreate={ password => {
          //  save to dB
          setPasswords([password, ...passwords])
          alert('New contact created successfully')
        }
      }/>

      <Card>

      </Card>

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
      />
   </>
  );
}

export default AppDashboard;
