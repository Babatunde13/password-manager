import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import EditContactModal from './editContact.modal'
import PreviewContactModal from './previewContact.modal'

const Contact = ({
  id,
  firstName,
  lastName,
  email,
  phone,
  company,
  jobTitle,
  handleDelete
}) => {
  const [editModal, setEditModal] = useState(false)
  const [previewModal, setpreviewModal] = useState(false)

  const editContact = () => {
    setEditModal(true)
  }

  const previewContact = () => {
    setpreviewModal(true)
  }

  const deleteContact = () => {
    console.log(id)
    handleDelete(id)
    alert('Contact deleted successfully')
  }

  return (
      <tr>
        <td>{firstName} {lastName}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{jobTitle} @ {company}</td>
        <td><Button onClick={previewContact}>Preview</Button></td>
        <td><Button onClick={editContact}>Edit</Button></td>
        <td><Button onClick={deleteContact}>Delete</Button></td>
        
        <EditContactModal
          show={editModal}
          firstname={firstName}
          lastname={lastName}
          email={email}
          phone={phone}
          jobtitle={jobTitle}
          title={"Edit Contact for "+firstName}
          company={company}
          onHide={() => {
            let n = window.confirm("Your changes won't be saved...")
            if (n) setEditModal(false)
          }}
          onEdit ={(contact) => {
            // save contact to dB
            // setContacts([contact, ...contacts])
            alert(`Contact for ${firstName} updated successfully`)
            setEditModal(false)
          }}
        />
        <PreviewContactModal
          show={previewModal}
          onEdit={()=>{setEditModal(true)}}
          firstname={firstName}
          lastname={lastName}
          email={email}
          phone={phone}
          jobtitle={jobTitle}
          title={"Preview Contact for "+firstName}
          company={company}
          onHide={() => {setpreviewModal(false)}}
        />
      </tr>
  )
}

const Contacts = ({contacts, handleEdit, handleDelete}) => {
  return (
    <>
      {!contacts && 'Fetching contacts...'}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job Title, Company</th>
            <th>Preview</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {contacts.map(ele => <Contact {...ele} 
          key={ele.id} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete} />)} 
        </tbody>
      </Table>
    </>
  )
}

export default Contacts
