import { useState, useEffect } from 'react'
import Card from "react-bootstrap/Card";
// import {  createContact} from "./models";
import data from '../data'
import 'bootstrap/dist/css/bootstrap.min.css';
import Passwords from '../components/Passwords';
import NavbarComponent from '../components/Navbar';

const AppDashboard = () => {
  const [passwords, setPasswords] = useState([])

  useEffect(() => {
    setPasswords(data)
  }, [])
  console.log(passwords)

  return (
   <>
      <NavbarComponent 
        contacts={ passwords} 
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
        handleEdit={(id) => {
          // create an edit Modal
            
        }}
        handleDelete={(id) => {
          setPasswords(passwords.filter( ele =>  ele.id !== id)) 
        }}  
      />
   </>
  );
}

export default AppDashboard;
