import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import EditPasswordModal from './editPassword.modal'
import PreviewPasswordModal from './previewPassword.modal'

const Password = ({
  id,
  accountName,
  accountUrl,
  email,
  password
}) => {
  const [editModal, setEditModal] = useState(false)
  const [previewModal, setpreviewModal] = useState(false)

  const editPassword = () => {
    setEditModal(true)
  }

  const previewPassword = () => {
    setpreviewModal(true)
  }

  const deletePassword = () => {
    console.log(id)
    handleDelete(id)
    alert('Password deleted successfully')
  }

  return (
      <tr>
        <td>{firstName} {lastName}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>{jobTitle} @ {company}</td>
        <td><Button onClick={previewPassword}>Preview</Button></td>
        <td><Button onClick={editPassword}>Edit</Button></td>
        <td><Button onClick={deletePassword}>Delete</Button></td>
        
        <EditPasswordModal
          show={editModal}
          firstname={firstName}
          lastname={lastName}
          email={email}
          phone={phone}
          jobtitle={jobTitle}
          title={"Edit Password for "+firstName}
          company={company}
          onHide={() => {
            let n = window.confirm("Your changes won't be saved...")
            if (n) setEditModal(false)
          }}
          onEdit ={(Password) => {
            // save Password to dB
            // setPasswords([Password, ...Passwords])
            alert(`Password for ${firstName} updated successfully`)
            setEditModal(false)
          }}
        />
        <PreviewPasswordModal
          show={previewModal}
          onEdit={()=>{setEditModal(true)}}
          firstname={firstName}
          lastname={lastName}
          email={email}
          phone={phone}
          jobtitle={jobTitle}
          title={"Preview Password for "+firstName}
          company={company}
          onHide={() => {setpreviewModal(false)}}
        />
      </tr>
  )
}

const Passwords = ({passwords, handleEdit, handleDelete}) => {
  return (
    <>
      {!passwords && 'Fetching Passwords...'}
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
        {passwords.map(ele => <Password {...ele} 
          key={ele.id} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete} />)} 
        </tbody>
      </Table>
    </>
  )
}

export default Passwords
