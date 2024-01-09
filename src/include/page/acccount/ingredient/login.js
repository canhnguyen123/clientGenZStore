import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login, checkIsLogin,loginAccount } from '../../../../service/funApi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import firebaseConfig from '../../../../config/configFirebase'; // Import tệp cấu hình Firebase
const auth = getAuth(firebaseConfig); // Lấy đối tượng auth từ ứng dụng Firebase đã khởi tạo
const provider = new GoogleAuthProvider();
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const heartLoveList = useSelector((state) => state.reducers.heartLoveList);
  const [toggle, setToggle] = useState(true);
  const [userName, setUserName] = useState('');
  const [password, setpassword] = useState('');

  useEffect(() => {
    checkIsLogin(navigate)();
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
  };

  const toggleAction = () => {
    setToggle(!toggle);
  };

  const Login = (event) => {
    event.preventDefault();
    if (userName.trim() !== '' && password.trim() !== '') {
      handleSubmit(event);
      const data = {
        username: userName,
        password: password,
      };
      dispatch(login(data, navigate,heartLoveList));
    } else {
      toast.error('Vui lòng không bỏ trống thông tin', {});
    }
  };

  // const user_id = localStorage.getItem('user_id');
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const data={
          fullname:user.displayName,
          img:user.photoURL,
          username:user.email,
          categoryAccount:2,
          phone:user.phoneNumber,
          accountId:user.uid,
        }
       dispatch(loginAccount(data,navigate,heartLoveList))
      })
      .catch((error) => {
        console.error('Lỗi đăng nhập: ', error);
      });
  }

  return (
    <Form className="form-login" onSubmit={Login}>
      <Row className="mb-3">
        <Form.Group className="form-input mg-15" as={Col} md="12">
          <div className="icon-item flex_center">
            <i className="fa-solid fa-user"></i>
          </div>
          <Form.Control
            required
            type="text"
            placeholder=""
            onChange={(e) => setUserName(e.target.value)}
          />
          <Form.Label>Tên đăng nhập</Form.Label>
        </Form.Group>
        <Form.Group className="form-input mg-15" as={Col} md="12">
          <div className="icon-item flex_center">
            <i className="fa-solid fa-lock"></i>
          </div>
          <Form.Control
            required
            type={toggle ? 'password' : 'text'}
            onChange={(e) => setpassword(e.target.value)}
          />
          <Form.Label>Mật khẩu</Form.Label>
          {toggle ? (
            <i className="fa-regular fa-eye-slash eye-icon" onClick={toggleAction}></i>
          ) : (
            <i className="fa-solid fa-eye eye-icon" onClick={toggleAction}></i>
          )}
        </Form.Group>
      </Row>
      <div className="quen-mk flex_end">
        <Link>Quên mật khẩu ?</Link>
      </div>
      <button className="btn-login flex_center" type="submit">
        <p>Đăng nhập</p>
      </button>
      <hr />
      <div className="login-orther flex_center">
        <h5>Hoặc</h5>
        <div className="flex_center">
          <div className="icon-login bg-bule flex_center">
            <i className="fa-brands fa-facebook"></i>
          </div>
          <div className="icon-login bg-gg flex_center" onClick={handleLogin}>
            <i className="fa-brands fa-google"></i>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default Login;
