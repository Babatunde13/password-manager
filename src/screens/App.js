import { useState, useEffect } from 'react'
import Card from "react-bootstrap/Card";
import { getPasswordsByUserID, createPassword, deletePassword, updatePassword } from "../models";
import 'bootstrap/dist/css/bootstrap.min.css';
import Passwords from '../components/Passwords';
import NavbarComponent from '../components/Navbar';

const AppDashboard = () => {
  const [passwords, setPasswords] = useState([])
  const [isPending, setIsPending] = useState(false)

  const handleCreate = async password => {
    //  save to dB
    password.userId = localStorage.getItem('userId')
    const newPassword = await createPassword(
      password.accountName, 
      password.accountUrl,
      password.password,
      password.userId)
    console.log(newPassword)
    setPasswords([newPassword, ...passwords])
    alert('New contact created successfully')
  }

  useEffect(() => {
    setIsPending(true)
    const getContacts = async () => {
      setIsPending(true)
      let passwordData = await getPasswordsByUserID(localStorage.getItem('userId'))
      console.log(passwordData)
      setPasswords(passwordData)
    }
    getContacts()
    setIsPending(false)
  }, [])

  return (
   <>
      <NavbarComponent 
        passwords={ passwords} 
        handleCreate={ handleCreate }/>

      <Card>

      </Card>
      {isPending ? <Card>Fetching Passwords...</Card> :
      <Passwords 
        passwords={passwords}
        handleEdit={async payload => {
          // create an edit Modal
          console.log(payload)
            await updatePassword({
              accountName: payload.accountName,
              accountUrl: payload.accountUrl,
              email: payload.email,
              password: payload.password
            }, payload.id)
            setPasswords(passwords.map( password => password.id === payload.id? payload : password))
        }}
        handleDelete={async id => {
          await deletePassword(id)
          setPasswords(passwords.filter( ele =>  ele.id !== id)) 
        }}  
      /> }
   </>
  );
}

export default AppDashboard;