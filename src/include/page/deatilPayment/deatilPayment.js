import { useState, useEffect } from 'react';
import { callDeatilPayment, createResquestCanneBill } from '../../../service/funApi';
import { formatPrice, checkAccount, formatDateTime } from '../../../service/funweb';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';
function Deatil() {
    const navigate = useNavigate();
    const user_id = localStorage.getItem('user_id');
    const { payment_id } = useParams();
    const [payment_deatil,setpayment_deatil] = useState('');
    const [show, setShow] = useState(false);
    const [mess, setMess] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
    useEffect(() => {
        if (payment_id && Number(payment_id) && payment_id > 0) {
            callDeatilPayment(payment_id, setpayment_deatil)
        }

    }, [payment_id])
    useEffect(() => {
        checkAccount(user_id, navigate)
    })
    const createResquet = () => {
        const data = {
            mess: mess
        }
        if (payment_deatil && payment_deatil.status_Id && payment_deatil.status_Id !== 5 && payment_deatil.status_Id !== 6) {
            if (Number(payment_id) && payment_id > 0 && Number(user_id) && user_id > 0) {
                createResquestCanneBill(payment_id, user_id, data, setShow, handleClose);
            } else {
                toast.error("Có lỗi xảy ra")
            }
        }
        else {
            toast.error("Không thể hủy đơn")
        }


    }
    return (
        <div className='pg-85-t flex_center deatil'>
            <div className='container-main row'>
                <h4 className='titel-c-drak '>Chi tiết đơn hàng
                    {payment_deatil && payment_deatil.status_Id && payment_deatil.status_Id !== 5 && payment_deatil.status_Id !== 6
                        ? <i class="fa-solid fa-pen-to-square account-box-item" onClick={handleShow}></i> : ""
                    }
                </h4>
                <div className='row '>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 item-box-deatil-payment'>
                        <p><label>Mã đơn hàng</label> : {payment_deatil && payment_deatil.code ? payment_deatil.code : "Chưa có dữ liệu"} </p>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 item-box-deatil-payment'>
                        <p><label>Tổng tiền</label> : {payment_deatil && payment_deatil.money ? formatPrice(payment_deatil.money) : "Chưa có dữ liệu"} </p>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 item-box-deatil-payment'>
                        <p><label>Trạng thái thanh toán</label> : {payment_deatil && payment_deatil.isPayment ? payment_deatil.isPayment : "Chưa có dữ liệu"} </p>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 item-box-deatil-payment'>
                        <p><label>Trạng thái đơn hàng</label> : {payment_deatil && payment_deatil.status_Name && payment_deatil.status_Name !== null ? payment_deatil.status_Name : "Chưa có dữ liệu"} </p>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 item-box-deatil-payment'>
                        <p><label>Số điện thoại người nhận</label> : {payment_deatil && payment_deatil.phoneUser ? payment_deatil.phoneUser : "Chưa có dữ liệu"} </p>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 item-box-deatil-payment'>
                        <p><label>Tên người nhận</label> : {payment_deatil && payment_deatil.nameUser ? payment_deatil.nameUser : "Chưa có dữ liệu"} </p>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 item-box-deatil-payment'>
                        <p><label>Phương thức thanh toán</label> : {payment_deatil && payment_deatil.methodPayment_name ? payment_deatil.methodPayment_name : "Chưa có dữ liệu"} </p>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 item-box-deatil-payment'>
                        <p><label>Phương thức ship</label> : {payment_deatil && payment_deatil.ship_name ? payment_deatil.ship_name : "Chưa có dữ liệu"} </p>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 item-box-deatil-payment'>
                        <p><label>Giá ship</label> : {payment_deatil && payment_deatil.ship_price ? formatPrice(payment_deatil.ship_price) : "Chưa có dữ liệu"} </p>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 item-box-deatil-payment'>
                        <p><label>Thời gian tạo đơn</label> : {payment_deatil && payment_deatil.created_at ? formatDateTime(payment_deatil.created_at) : "Chưa có dữ liệu"} </p>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 item-box-deatil-payment'>
                        <p><label>Thời gian hoàn thành</label> : {payment_deatil && payment_deatil.timeUpdate && payment_deatil.timeUpdate !== null ? formatDateTime(payment_deatil.timeUpdate) : "Chưa có dữ liệu"} </p>
                    </div>
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 item-box-deatil-payment'>
                        <p><label>Địa chỉ nhận hàng</label> : {payment_deatil && payment_deatil.address ? payment_deatil.address : "Chưa có dữ liệu"} </p>
                    </div>
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 item-box-deatil-payment'>
                        <p><label>Địa chỉ gửi hàng</label> : {payment_deatil && payment_deatil.location && payment_deatil.location !== null ? payment_deatil.location : "Chưa có dữ liệu"} </p>
                    </div>
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 item-box-deatil-payment'>
                        <p><label>Ghi chú</label> : {payment_deatil && payment_deatil.note && payment_deatil.note !== null ? payment_deatil.note : "Chưa có dữ liệu"} </p>
                    </div>
                </div>
                <h5 className='titel-c-drak '>Các sản phẩm</h5>
                <div className='row'>
                    {payment_deatil && payment_deatil.arrPaymentDeatil && payment_deatil.arrPaymentDeatil.map((item) => {
                        return (
                            <Link to={`/deatil/${item.product_id}`} className='col-xl-3 col-lg-3 col-md-6 col-sm-12'>
                                <div className=" payment-deatil-product">
                                    <h2 className=" title-code-payment mg-15">Sản phẩm : {item.product_name}</h2>
                                    <span className="mg-15">Thể loại {item.theloai_name}</span>
                                    <p className="mg-15">Số lượng: {item.quantity}</p>
                                    <p className="mg-15">Giá mua :{formatPrice(item.price)}</p>
                                    <p className="mg-15">Thành tiền :{formatPrice(item.price * item.quantity)}</p>
                                    <p className="mg-15">Màu sắc: {item.color}</p>
                                    <p className="">Size :{item.size}</p>
                                    <p className="mg-15">Thể loại: {item.category_name}</p>
                                    <p className="mg-15">Phân loại :{item.phanloai_name}</p>
                                </div>
                            </Link>

                        )
                    })}

                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Hủy đơn hàng</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group className='col-12' controlId="validationCustom01">
                                    <Form.Label>Lý do hủy đơn</Form.Label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data="<p></p>"
                                        onReady={editor => { }}
                                        onChange={
                                            (event, editor) => {
                                                const data = editor.getData();
                                                setMess(data);
                                            }
                                        }
                                        onBlur={(event, editor) => { }}
                                        onFocus={(event, editor) => { }}
                                    />
                                </Form.Group>

                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button variant="primary" onClick={createResquet}>
                            Xác nhận
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default Deatil