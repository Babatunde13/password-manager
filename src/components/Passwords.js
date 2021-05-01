import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FormControl from "react-bootstrap/FormControl";
import CryptoJS from "crypto-js";
import dotenv from 'dotenv'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import PreviewPasswordModal from './previewPassword.modal'
import web from '../assets/web.png';
import { Col } from 'react-bootstrap';


dotenv.config()

const Password = ({
  id,
  accountName,
  accountUrl,
  email,
  password,
  handleDelete,
  handleEdit
}) => {
  const [editModal, setEditModal] = useState(false)
  const [previewModal, setpreviewModal] = useState(false)
  const title_ = accountName || accountUrl

  const previewPassword = () => {
    setpreviewModal(true)
  }

  const editPassword = (payload) => {
    handleEdit(payload)
    setEditModal(false)
  }


  const deletePassword = () => {
    handleDelete(id)
    alert('Password deleted successfully')
  }

  return (
      <Row>
          <Button style={{backgroundColor: "white", color: 'black', margin: '5px 0px'}} onClick={previewPassword}>
            <span>
              <Col sm={4}><img style={{paddingLeft: '1', marginLeft: '1'}} src={web} alt="" /></Col>
              <Col sm={8}><span>{accountName}</span></Col>
            </span>
          </Button>
        <PreviewPasswordModal
          id={id}
          show={previewModal}
          edit={editModal}
          onHideEdit={()=>{setEditModal(false)}}
          onEdit={()=>{setEditModal(true)}}
          onDelete={() => {deletePassword(); setpreviewModal(false)}}
          accountName={accountName}
          accountUrl={accountUrl}
          email={email}
          password={password}
          editPassword={editPassword}
          title={"Preview Password for "+title_}
          onHide={() => {setpreviewModal(false)}}
        />
      </Row>
  )
}


const Passwords = ({passwords, handleEdit, handleDelete, updateSearch, isPending}) => {
  const [search, setSearch] = useState('')
  return (
      <Container border="dark" style={{margin: '5em 8em', padding: '20px', border: '1px solid black'}}> 
        <Row className="">
         <Row className="justify-content-between">
          <Col sm={5}>{passwords.length} Sites and Apps</Col>
            <Col sm={7} >
              <Form inline onSubmit={(e) => {e.preventDefault()}}>
                <FormControl type="text" placeholder="Search Passwords" className="mr-sm-2 lg" onChange={(e) => {setSearch(e.target.value); updateSearch(search)}}/>
              </Form>
            </Col>
          </Row> 
        </Row> <br/><br/>
        <Row>
          {isPending ? 'Loading data...' :
            passwords.length > 0? 
              passwords.map(ele => {
                const bytes = CryptoJS.AES.decrypt(ele.encryptedPassword, process.env.REACT_APP_SECRET_KEY);
                const password = bytes.toString(CryptoJS.enc.Utf8)
                const passwordData = {...ele, password}
                return <Password {...passwordData} key={ele.id} handleEdit={handleEdit} handleDelete={handleDelete} />
                }) :
                "You haven't created any passwords"
          }
        </Row>
      </Container>
  )
}

export default Passwords
