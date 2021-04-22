import { useState, useEffect } from 'react'
// import {  createContact} from "./models";
import data from '../data'
import 'bootstrap/dist/css/bootstrap.min.css';
import Contacts from '../components/Contacts';
import NavbarComponent from '../components/Navbar';

const AppDashboard = () => {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    setContacts(data)
  }, [])

  return (
   <>
      <NavbarComponent 
        contacts={contacts} 
        onCreate={ contact => {
          //  save to dB
          setContacts([contact, ...contacts])
          alert('New contact created successfully')
        }
      }/>
      <Contacts 
        contacts={contacts}
        handleEdit={(id) => {
          // create an edit Modal
            
        }}
        handleDelete={(id) => {
          setContacts(contacts.filter( ele =>  ele.id !== id)) 
        }}  
      />
   </>
  );
}

export default AppDashboard;
