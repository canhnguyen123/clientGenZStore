import {useState, useEffect} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {Link, useNavigate } from 'react-router-dom';
import {useDispatch,useSelector } from 'react-redux';
import APILink from "../../../service/APILink";
import {updateUserInfro,callAPIMyPayment,callAPIStatusPaymentFun} from "../../../service/funApi";
import {formatPrice,formatDateTime,checkAccount} from "../../../service/funweb";
import moment from 'moment';
function MyAccount() {
    const dispatch = useDispatch();
    const user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();
    const [activeListPayment,setactiveListPayment]=useState(0);
    const [listPayment,setlistPayment]=useState([]);
    const [infroUser,setinfroUser]=useState([]);
    const [listTitelStatus,setListTitelStatus]=useState([]);
    const [toggleModalInfro,setToggleModalInfro]=useState(true);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [validated, setValidated] = useState(false);
    const [fullnameValue, setFullnameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [addressValue, setAddressValue] = useState("");
    useEffect(() => {
      if (user_id !== null && user_id > 0) {
        callAPIStatusPayment();
      } 
      checkAccount(user_id,navigate)
    }, []);
  
    useEffect(() => {
      if (user_id !== null && user_id > 0 && activeListPayment > 0) {
        callAPIPayment(activeListPayment);
        callAPIInfro(user_id);
      }
    }, [user_id, activeListPayment]);


    const toggleModalUser=()=>{
      setToggleModalInfro(!toggleModalInfro);
    }
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };
   
    
      const callAPIStatusPayment = () => {
        callAPIStatusPaymentFun(setListTitelStatus,setactiveListPayment);
      };
      const callAPIInfro = (user_id) => {
        APILink.get(`user/deaitl/${user_id}`)
          .then((response) => {
            if (response.data.status === 'success') {
                setinfroUser(response.data.results);
                setFullnameValue(response.data.results.fullname);
                setPhoneValue(response.data.results.phone);
                setEmailValue(response.data.results.email);
                setAddressValue(response.data.results.address);
            } else {
              toast.error("Có lỗi xảy ra khi lấy dữ liệu người dùng");
            }
          })
          .catch((error) => {
            console.error('Error fetching:', error);
          });
      };
      const changeactiveTitel = (id) => {
        callAPIPayment(id);
        setactiveListPayment(id)
      };
    
      const callAPIPayment = (status_id) => {
        callAPIMyPayment(user_id,status_id,setlistPayment);
      };
      const updateInfroUser=(e)=>{
        e.preventDefault();
        const data={
          fullName:fullnameValue,
          phone:phoneValue,
          email:emailValue,
          address:addressValue
        }
        updateUserInfro(data, user_id, setinfroUser,handleClose); 
      }
  return (
    <div className='pg-85-t flex_center'>
      <div className='container-main row'>
        <div className="box-infro">
            <h4 className='titel-c-drak mg-100 color-red' >Xin chào {infroUser&&infroUser.fullname} </h4>
            <div className="toggle-box-infro flex_center" onClick={handleShow}>
                <i class="fa-solid fa-user"></i>
            </div>
         </div>
        <div className="row col-12">
          <div className="lits-title-status-payment">
            {listTitelStatus && listTitelStatus.map((item, index) => (
              <div
              className={`item-title-status-payment flex_center ${item.id === activeListPayment ? 'active' : ''}`}
                key={item.id}
                onClick={() => changeactiveTitel(item.id)}
              >
                <p>{item.name}</p>
              </div>
            ))}
          </div>
          <div className="list-cart-payment row">
            {activeListPayment > 0 && listPayment && listPayment.length > 0 ? (
              listPayment.map((item) => (
                <Link to={`/deatilPayment/${item.id}`} className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <div className="item-cart-payment" key={item.id}>
                     <h2 className="  title-code-payment mg-15">Mã đơn : {item.code}</h2>
                    <span className="mg-15">Tổng hóa đơn: {formatPrice(item.allPrice)}</span>
                    <p className="mg-15">Trạng thái : {item.isPayment}</p>
                    <p className="">Thời gian :{formatDateTime(item.created_at)}</p>
                
                </div>
                </Link>
              ))
            ) : (
             <div className="flex_center pd-20">
                 <p>Không có đơn hàng nào.</p>
             </div>
            )}
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} className="conetent-modal-infro">
          <Modal.Header closeButton>
            <Modal.Title>{toggleModalInfro?"Thông tin người dùng":"Cập nhật thông tin"} <i class="fa-solid fa-user-pen toggle-modal-dialog" onClick={toggleModalUser}></i></Modal.Title>
          </Modal.Header>
          <Modal.Body >
            {toggleModalInfro?
                <Form>
                <Row className="mb-3">
                <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" className="mg-15">
                  <p> <Form.Label>Họ tên</Form.Label> : {infroUser&& infroUser.fullname&&infroUser.fullname.trim().length>0? infroUser.fullname : "Chưa cập nhật"}</p>
                  </Form.Group>
                  <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" className="mg-15">
                      <p> <Form.Label>Số điện thoại</Form.Label> : {infroUser&&infroUser.phone&&infroUser.phone.trim().length>0? infroUser.phone : "Chưa cập nhật"}</p>
                  </Form.Group>
                  <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" className="mg-15">
                      <p> <Form.Label>Địa chỉ</Form.Label> :{infroUser && infroUser.address&& infroUser.address.trim().length>0 ? infroUser.address : "Chưa cập nhật"}</p>
                  </Form.Group>
                  <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" className="mg-15">
                      <p> <Form.Label>Mã code</Form.Label> :{infroUser && infroUser.code&& infroUser.code.trim().length>0 ? infroUser.code : "Chưa cập nhật"}</p>
                  </Form.Group>
                  <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" className="mg-15">
                      <p> <Form.Label>Email</Form.Label> :{infroUser && infroUser.email&& infroUser.email.trim().length>0 ? infroUser.email : "Chưa cập nhật"}</p>
                  </Form.Group>
                  <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" className="mg-15">
                      <p> <Form.Label>Thể loại tài khoản</Form.Label> :{infroUser && infroUser.acctionCategory&& infroUser.acctionCategory.trim().length>0 ? infroUser.acctionCategory : "Chưa cập nhật"}</p>
                  </Form.Group>
                  <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" className="mg-15">
                      <p> <Form.Label>Trạng thái</Form.Label> :{infroUser && infroUser.status&& infroUser.status.trim().length>0 ? infroUser.status : "Chưa cập nhật"}</p>
                  </Form.Group>
                  <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" className="mg-15">
                      <p> <Form.Label>Thời gian tạo</Form.Label> :{infroUser && infroUser.create_at&& infroUser.create_at.trim().length>0 ? infroUser.create_at+"  ("+formatDateTime(infroUser.create_at)+") " : "Chưa cập nhật"}</p>
                  </Form.Group>
                </Row>
  
              </Form> :
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" className="mg-15">
                   <Form.Label><i class="fa-solid fa-signature mg-l-5"></i> Họ tên</Form.Label> 
                   <Form.Control
                      required
                      type="text"
                      value={fullnameValue}
                      onChange={(e)=>setFullnameValue(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" className="mg-15">
                   <Form.Label><i class="fa-solid fa-phone mg-l-5"></i>Số điện thoại</Form.Label> 
                   <Form.Control
                      required
                      type="text"
                      value={phoneValue}
                      onChange={(e)=>setPhoneValue(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" className="mg-15">
                   <Form.Label><i class="fa-solid fa-envelope mg-l-5"></i>Email</Form.Label> 
                   <Form.Control
                      required
                      type="text"
                      value={emailValue}
                      onChange={(e)=>setEmailValue(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col} xl="6" lg="6" md="12" sm="12" className="mg-15">
                   <Form.Label><i class="fa-solid fa-location-dot mg-l-5"></i>Địa chỉ</Form.Label> 
                   <Form.Control
                      required
                      type="text"
                      value={addressValue}
                      onChange={(e)=>setAddressValue(e.target.value)}
                    />
                  </Form.Group>
                </Row>
                <Button type="submit" onClick={updateInfroUser}>Cập nhật</Button>
              </Form>
            }
          
          </Modal.Body>
        </Modal>
    </div>
  );
}

export default MyAccount;