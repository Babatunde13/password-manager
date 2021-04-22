import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FormControl from "react-bootstrap/FormControl";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import PreviewPasswordModal from './previewPassword.modal'
import url from '../assets/url.png';

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
          <img src={url} alt="" />
          <span>{accountName}</span>
        </Button>
        <hr/>
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
         <Row style={{display: 'flex', justifyContent: 'space-between'}}>
          {passwords.length} Sites and Apps
            <Form inline>
              <FormControl type="text" placeholder="Search Passwords" className="mr-sm-2" />
            </Form>
          </Row> 
        </Card.Header> <br/><br/>
        {!passwords && 'Fetching Passwords...'}
        {passwords.map(ele => 
          <Password 
            {...ele} 
            key={ele.id} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete} />
        )} 
      </Card>
  )
}

export default Passwords
