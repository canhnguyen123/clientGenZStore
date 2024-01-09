import moment from 'moment';
import 'moment/locale/vi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(price);
};
export const formatDateTime = (dateTime) => {
  moment.locale('vi');
  return moment(dateTime).fromNow();
};
export const checkAccount = (user_id,navigate) => {
  if (user_id&& user_id === null && user_id > 0) {
    toast.error("Bạn chưa đăng nhập. Vui lòng đăng nhập để vào trang");
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }
};