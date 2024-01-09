import { da } from 'date-fns/locale';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APILink from "../../../../service/APILink";
function FormExample() {
  const [username,setUserName]=useState('');
  const [fullname,setfullname]=useState('');
  const [password,setpassword]=useState('');
  const [apassword,setapassword]=useState('');
  const [togglePass,settogglePass]=useState(false);
  const [togglePassConfim,settogglePassConfim]=useState(false);
  const showPass=()=>{
    settogglePass(!togglePass);
  }
  const showPassConfim=()=>{
    settogglePassConfim(!togglePassConfim);
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if(password!==apassword){
      toast.error('Xác nhận mật khẩu phải trùng với mật khẩu');
    }
    else if(username.trim().length===0||
            fullname.trim().length===0||
            password.trim().length===0||
            apassword.trim().length===0){
     toast.error('Không được bỏ trống ô nhập');
    }
    else{
      const data={
        username:username,
        fullName:fullname,
        password:password
      }
      APILink.post('user/dangki',data)
      .then((response) => {
        if(response.data.status==="success"){
            toast.success(response.data.mess,{});
            setUserName('');
            setfullname('');
            setpassword('');
            setapassword('');
            clearFormInputs()
        }
        else if(response.data.status==="fail"){
          toast.success(response.data.mess,{})
        }
      })
      .catch((error) => {
      });
    }

  };
  const clearFormInputs = () => {
    document.querySelectorAll('.register-input-form').forEach((input) => {
      input.value = '';
    });
  };
  return (
    <Form className='form-login' noValidate onSubmit={handleSubmit}>
      <Row className="mb-3">
      <Form.Group className='form-input mg-15' as={Col} md="12">
        <div className='icon-item flex_center'><i class="fa-solid fa-signature"></i></div>
          <Form.Control
            required
            type="text"
            className='register-input-form'
            onChange={(e)=>setfullname(e.target.value)}
          />
           <Form.Label>Họ tên</Form.Label>
        </Form.Group>
        <Form.Group className='form-input mg-15' as={Col} md="12">
        <div className='icon-item flex_center'><i class="fa-solid fa-user"></i></div>
          <Form.Control
            required
            type="text"
            className='register-input-form'
            onChange={(e)=>setUserName(e.target.value)}
          />
           <Form.Label>Tên đăng nhập</Form.Label>
        </Form.Group>
        <Form.Group className='form-input mg-15' as={Col} md="12">
        <div className='icon-item flex_center'><i class="fa-solid fa-lock"></i></div>
          <Form.Control
            required
            className='register-input-form'
            type= {togglePass?
              "text" :'password'}
            onChange={(e)=>setpassword(e.target.value)}
          />
           <Form.Label>Mật khẩu</Form.Label>
           {togglePass?
           <i class="fa-solid fa-eye eye-icon" onClick={showPass}></i>: 
           <i class="fa-regular fa-eye-slash eye-icon" onClick={showPass}></i>}
        </Form.Group>
        <Form.Group className='form-input mg-15' as={Col} md="12">
        <div className='icon-item flex_center'><i class="fa-solid fa-lock"></i></div>
          <Form.Control
            required
            type= {togglePassConfim?
              "text" :'password'}
            className='register-input-form'
            onChange={(e)=>setapassword(e.target.value)}
          />
           <Form.Label>Xác nhận khẩu</Form.Label>
           {togglePassConfim?
           <i class="fa-solid fa-eye eye-icon" onClick={showPassConfim}></i>: 
           <i class="fa-regular fa-eye-slash eye-icon" onClick={showPassConfim}></i>}
           
           
        </Form.Group>
       </Row>
            <button className='btn-login flex_center'>
              <p>  Đăng kí</p>
             </button>
            
    </Form>
      
  );
}

export default FormExample;