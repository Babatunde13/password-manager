import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from "react-bootstrap/ListGroup";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import PreviewPasswordModal from './previewPassword.modal'

const Password = ({
  id,
  accountName,
  accountUrl,
  email,
  password,
  handleDelete
}) => {
  // eslint-disable-next-line
  const [editModal, setEditModal] = useState(false)
  const [previewModal, setpreviewModal] = useState(false)
  const title_ = accountName || accountUrl

  const previewPassword = () => {
    setpreviewModal(true)
  }

  const deletePassword = () => {
    console.log(id)
    handleDelete(id)
    alert('Password deleted successfully')
  }

  return (
      <ListGroup style={{padding: '1em'}}>
        <Button style={{backgroundColor: "white", color: 'black'}} onClick={previewPassword}>
          <img src="./src/assets/url.png" alt="" />
          <span>{accountName}</span>
        </Button>
        <PreviewPasswordModal
          show={previewModal}
          edit={editModal}
          onHideEdit={()=>{setEditModal(false)}}
          onEdit={()=>{setEditModal(true)}}
          onDelete={deletePassword}
          accountName={accountName}
          accountUrl={accountUrl}
          email={email}
          password={password}
          title={"Preview Password for "+title_}
          onHide={() => {setpreviewModal(false)}}
        />
      </ListGroup>
  )
}


const Passwords = ({passwords, handleEdit, handleDelete}) => {
  return (
      <Card border="dark" style={{margin: ' 5em 10em', padding: '20px', border: '1px solid black'}}> 
        <Card.Header>
          {passwords.length} Sites and Apps
        </Card.Header>
        {!passwords && 'Fetching Passwords...'}
        {passwords.map(ele => <Password {...ele} 
            key={ele.id} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} />)} 
      </Card>
  )
}

export default Passwords
