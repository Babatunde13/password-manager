import { useState, useEffect } from 'react'
import { 
  getPasswordsByUserID, 
  createPassword, 
  deletePassword, 
  updatePassword,
  filterPassword } from "../models";
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
      password.email,
      password.encryptedPassword,
      password.userId)
    setPasswords([newPassword, ...passwords])
    alert('New contact created successfully')
  }

  useEffect(() => {
    setIsPending(true)
    const getContacts = async () => {
      let passwordData = await getPasswordsByUserID(localStorage.getItem('userId'))
      setPasswords(passwordData)
    }
    getContacts()
    setTimeout(() => {
      setIsPending(false)
    }, 1000);
  }, [])

  return (
   <>
      <NavbarComponent 
        passwords={ passwords} 
        handleCreate={ handleCreate }/>

      <Passwords 
        isPending={isPending}
        passwords={passwords}
        handleEdit={async payload => {
            await updatePassword({
              accountName: payload.accountName,
              accountUrl: payload.accountUrl,
              email: payload.email,
              encryptedPassword: payload.password
            }, payload.id)
            setPasswords(passwords.map( password => password.id === payload.id? payload : password))
        }}
        handleDelete={async id => {
          await deletePassword(id)
          setPasswords(passwords.filter( ele =>  ele.id !== id)) 
        }}  
      /> 
   </>
  );
}

export default AppDashboard;