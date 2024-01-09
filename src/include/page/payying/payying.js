import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import APILink from "../../../service/APILink";
import { formatPrice } from "../../../service/funweb";
import { createPayment } from "../../../service/funApi";

function Payying() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [user_id, setUser_id] = useState(0);
  const [validated, setValidated] = useState(false);
  const [listProduct, setListProduct] = useState([])
  const [listmethod, setlistmethod] = useState([])
  const [listShip, setlistShip] = useState([])
  const [phoneUser, setphoneUser] = useState('');
  const [fullnameUser, setfullnameUser] = useState('');
  const [addressUser, setaddressUser] = useState('');
  const [phonePayment, setphonePayment] = useState('');
  const [fullnamePayment, setfullnamePayment] = useState('');
  const [codeMethod, setcodeMethod] = useState('');
  const [method, setmethod] = useState(0);
  const [shipID, setshipID] = useState(0);
  const [isPayment, setisPayment] = useState(0);
  const [shipPrice, setshipPrice] = useState(0);
  const listId = location.state && location.state.data ? location.state.data : [];


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  useEffect(() => {
    if (listId.length === 0) {
      toast.error('Bạn chưa chọn sản phẩm để thanh toán', {});
      setTimeout(() => {
        navigate('/cart');
      }, 1000);
    }

    const id = localStorage.getItem('user_id');
    if (id) {
      setUser_id(id);
      PostAPi();
      apiUser();
      getmethod();
      getShip()
    }

  }, [user_id]);


  const PostAPi = () => {
    const data = {
      list_id: listId
    }
    APILink
      .post(`cart/get-product-deatil/${user_id}`, data)
      .then(response => {
        if (response.data.status === 'success') {
          setListProduct(response.data.results);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }
  const apiUser = () => {

    APILink
      .get(`user/deaitl/${user_id}`)
      .then(response => {
        if (response.data.results) {
          setphoneUser(response.data.results.phone);
          setfullnameUser(response.data.results.fullname);
          setphonePayment(response.data.results.phone);
          setfullnamePayment(response.data.results.fullname);
          setaddressUser(response.data.results.address);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }
  const getmethod = () => {
    APILink
      .get(`payment/get-method-payment`)
      .then(response => {
        if (response.data.results) {
          setlistmethod(response.data.results);
          if (response.data.results.length > 0) {
            setmethod(response.data.results[0].id)
            setisPayment(response.data.results[0].isPayment)
          }
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }

  const getShip = () => {
    APILink
      .get(`payment/get-ship`)
      .then(response => {
        if (response.data.results && response.data.results.length > 0) {
          const firstShip = response.data.results[0];
          setlistShip(response.data.results);
          setshipID(firstShip.id);
          setshipPrice(firstShip.price);
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }

  const getPrice = () => {
    const totalPrice = listProduct.reduce((total, item) => {
      return total += item.price * item.quantity
    }, 0);
    return totalPrice + Number(shipPrice)
  }

  const chaneMethod = (event) => {
    const method = event.target.value;
    const limit = event.target.options[event.target.selectedIndex].getAttribute('data-id');
    const codemethod = event.target.options[event.target.selectedIndex].getAttribute('data-code');
    setcodeMethod(codemethod)
    setmethod(method);
    setisPayment(limit);
  }

  const chaneShip = (event) => {
    const shipID = event.target.value;
    const priceShip = event.target.options[event.target.selectedIndex].getAttribute('data-id');
    setshipID(shipID);
    setshipPrice(priceShip);
  }
  const payying = (event) => {
    event.preventDefault();
    const arr = [];
    const totalPrice = getPrice();
    if (addressUser !== "") {
      listProduct.forEach(item => {
        const arrDeatil = {
          product_id: item.product_id,
          color: item.color,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        }
        arr.push(arrDeatil)
      })
      const dataPayying = {
        user_id: user_id,
        address: addressUser,
        priceBill: totalPrice,
        method: method,
        isPayment: isPayment,
        phoner: phonePayment,
        fullname: fullnamePayment,
        shipID: shipID,
        paymentDeail: JSON.stringify(arr)
      }
      if (codeMethod === "VNPAY") {
        const data = {
          amount: getPrice()
        }
        APILink.post(`online-payment/vnpay`, data)
          .then(response => {
            const dataPayingString = JSON.stringify(dataPayying);
            localStorage.setItem('dataPaying', dataPayingString);
            window.location.href = response.data.link;
          })
          .catch(error => {
            console.error('Error fetching products:', error);
          });
      }
      else {
        dispatch(createPayment(dataPayying,navigate,user_id));
      }
    }
    else {
      toast.error('Vui lòng nhập đủ thông tin');
    }
}
  const updateInfro = () => {
    if (addressUser !== "" && phonePayment !== "" && fullnamePayment !== "") {
      toast.success("Sửa thành công", {});
      handleClose()
    } else {
      toast.error('Vui lòng nhập đủ thông tin', {});
    }
  }
  return (
    <div className='pg-85-t flex_center deatil'>
      <div className='container-main row'>
          <h4 className='titel-c-drak '>Thanh toán đơn hàng</h4>
        <div className='infro-user row'>
          <div className='flex_center edit-infro-user' onClick={handleShow}>  <i class="fa-solid fa-user-pen "></i></div>
          <div className='infro-user-text col-xl-6 col-sm-12 pd-20'><label>Họ tên người đặt :</label> {fullnameUser} </div>
          <div className='infro-user-text col-xl-6 col-sm-12 pd-20'><label>Số điện thoại người đặt :</label> {phoneUser}</div>
          <div className='infro-user-text col-xl-6 col-sm-12 pd-20'><label>Họ tên người nhận :</label> {fullnamePayment}</div>
          <div className='infro-user-text col-xl-6 col-sm-12 pd-20'><label>Số điện thoại người nhận :</label> {phonePayment}</div>
          <div className='infro-user-text col-xl-6 col-sm-12 pd-20'><label>Địa chỉ người nhận :</label> {addressUser}</div>
        </div>
        <div className='infro-product'>
          {listProduct.map((item) => {
            return (
              <Link>
                <div className='infro-product-item'>
                  <div className='flex_start mg-15'>
                    <img className='' src={item.img} />
                    <h4>{item.name}</h4> </div>
                  <div className='flex_start mg-15'>
                    <p>
                      Giá : {formatPrice(item.price)}
                      <span>Số lượng : {item.quantity}  {item.color}/{item.size}</span>
                      <span>Thành tiền :{formatPrice(item.price * item.quantity)} </span>
                    </p> </div>
                </div>
              </Link>
            )
          })}


        </div>
        <div className='infro-results'>

          <div className='row'>
            <Form noValidate>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" className='mg-15'>
                  <Form.Label>Chọn Phương thức thanh toán</Form.Label>
                  <Form.Select onChange={chaneMethod}>
                    {listmethod.map((item) => {
                      return (
                        <option value={item.id} data-id={item.isPayment} data-code={item.code}> {item.name} </option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>
              </Row>

            </Form>
          </div>
          <div className='row'>
            <Form noValidate>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" className='mg-15'>
                  <Form.Label>Chọn Phương thức vận chuyển</Form.Label>
                  <Form.Select onChange={chaneShip}>
                    {listShip.map((item) => {
                      return (
                        <option value={item.id} data-id={item.price} > {item.name} </option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>
              </Row>

            </Form>
          </div>
          {listProduct.length > 0 ? <div><p><label>Phí ship : </label> {formatPrice(shipPrice)}</p> </div> : ""}

          {listProduct.length > 0 ? <div><p><label>Tổng tiền : </label> {formatPrice(getPrice())}</p> </div> : ""}

          <div>
            <button className='paying-btn flex_center mg-30' onClick={payying} >
              <i className="fa-solid fa-cart-shopping"></i>
              <p>Thanh toán</p>
            </button>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thông tin người nhận</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" className='mg-15'>
                  <Form.Label>Họ tên</Form.Label>
                  <Form.Control
                    onChange={(e) => setfullnamePayment(e.target.value)}
                    required
                    type="text"
                    placeholder=""
                    value={fullnamePayment}
                  />
                </Form.Group>
                <Form.Group as={Col} md="12" className='mg-15'>
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    onChange={(e) => setphonePayment(e.target.value)}
                    required
                    type="text"
                    placeholder=""
                    value={phonePayment}
                  />
                </Form.Group>
                <Form.Group as={Col} md="12" className='mg-15'>
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    onChange={(e) => setaddressUser(e.target.value)}
                    required
                    type="text"
                    placeholder=""
                    value={addressUser}
                  />
                </Form.Group>
              </Row>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="primary" onClick={() => updateInfro()}>
              Lưu
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  )
}

export default Payying
