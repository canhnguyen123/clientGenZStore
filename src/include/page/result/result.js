import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { formatPrice } from "../../../service/funweb"
import { createPayment } from "../../../service/funApi";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const VnpayReturn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [responseData, setResponseData] = useState(null);
  const storedDataPayingString = localStorage.getItem('dataPaying');
  const dataPayying = JSON.parse(storedDataPayingString);
  const user_id = localStorage.getItem('user_id');
  if(responseData===null){
    toast.error('Bạn chưa thể vào trang này khi chưa thanh toán xong');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const responseInfo = {
      vnp_BankTranNo: searchParams.get('vnp_BankTranNo'),
      vnp_Amount: searchParams.get('vnp_Amount'),
      vnp_BankCode: searchParams.get('vnp_BankCode'),
      vnp_OrderInfo: searchParams.get('vnp_OrderInfo'),
      vnp_PayDate: searchParams.get('vnp_PayDate'),
      vnp_ResponseCode: searchParams.get('vnp_ResponseCode'),
      vnp_status: searchParams.get('vnp_TransactionStatus'),
    };
    setResponseData(responseInfo);
  }, [location.search]);

  useEffect(() => {
    if (responseData && responseData.vnp_status && responseData.vnp_status !== null && responseData.vnp_status === "00") {
      dispatch(createPayment(dataPayying, navigate, user_id))
    }
  }, [responseData, user_id, dataPayying]);

  if (!responseData) {
    return <p>Loading...</p>;
  }

  return (
    <div className='pg-85-t flex_center deatil'>
      <div className='container-main row'>
        <h1>
          {responseData??responseData.vnp_status === "00" ? "Giao dịch thành công" : "Giao dịch thất bại"}
        </h1>
        <p>Mã đơn hàng: {responseData.vnp_BankTranNo}</p>
        <p>Số tiền: {responseData.vnp_Amount}</p>
        <p>Nội dung thanh toán: {responseData.vnp_OrderInfo}</p>
        <p>Thời gian: {responseData.vnp_PayDate}</p>
      </div>
    </div>
  );
};

export default VnpayReturn;
