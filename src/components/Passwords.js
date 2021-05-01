import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CryptoJS from "crypto-js";
import dotenv from 'dotenv'
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
      <Col sm="12">
          <Button style={{backgroundColor: "white", color: 'black', margin: '5px 0px', width: "100%"}} onClick={previewPassword}>
            <Row>
              <Col sm={1}><img src={web} alt="" /></Col>
              <Col className="text-left mt-1">{accountName}</Col>
            </Row>
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
      </Col>
  )
}


const Passwords = ({passwords, handleEdit, handleDelete, updateSearch, isPending}) => {
  const [search, setSearch] = useState('')
  return (
      <Container className="p-3 my-5 bordered"> 
        <Row className="p-2 text-white" style={{backgroundColor : "dodgerblue"}}>
          <Col xs={12} sm={6} className="pt-2">{passwords && passwords.length} Sites and Apps</Col>
          <Col xs={12} sm={6}>
            <Form inline onSubmit={(e) => {e.preventDefault()}}>
              <input type="text" placeholder="Search Passwords" className="form-control ml-md-auto" onChange={(e) => {setSearch(e.target.value); updateSearch(search)}}/>
            </Form>
          </Col>
        </Row> 
          <br/><br/>
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
