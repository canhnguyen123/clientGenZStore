import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getListPageMyCart, deleteCartID,updateCartID } from '../../../service/funApi';
import { formatPrice } from '../../../service/funweb';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import 'alertifyjs/build/css/alertify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom';
function Mycart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { product_id } = useParams();
    const list_cart = useSelector((state) => state.cart.list_cart);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [quantityAll, setQuantityAll] = useState(0);
    const [money, setmoney] = useState(0)
    const [moneyShip, setmoneyShip] = useState(0)
    const [numberProduct, setNumberProduct] = useState(0)
    const [size, setsize] = useState('');
    const [color, setcolor] = useState('');
    const user_id = localStorage.getItem('user_id');
    let [selectedPrice, setSelectedPrice] = useState(0);
    const [quantityList, setQuantityList] = useState({});
    const [arrId, setArrId] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dispatch(getListPageMyCart(user_id));
                const initialQuantityList = {};
                data.forEach((item) => {
                    initialQuantityList[item.id] = item.quantity || 1;
                });
                setQuantityList(initialQuantityList);
            } catch (error) {
                console.error('Error fetching cart data:', error);
            }
        };

        fetchData();
    }, [dispatch, user_id]);
    useEffect(() => {
        if(numberProduct>0){
            setmoneyShip(30000)
        }else{
            setmoneyShip(0) 
          }
    }, [numberProduct]);
    const increaseQuantity = (itemId) => {
        setQuantityList((prevQuantityList) => ({
            ...prevQuantityList,
            [itemId]: (prevQuantityList[itemId] || 0) + 1,
        }));
    };

    const decreaseQuantity = (itemId) => {
        if (quantityList[itemId] > 1) {
            setQuantityList((prevQuantityList) => ({
                ...prevQuantityList,
                [itemId]: prevQuantityList[itemId] - 1,
            }));
        }
    };
    const changeSelect = (e) => {
        const value = e.target.value;

        if (value === "1") {
            const inputElements = document.querySelectorAll('.checkbox-cart');
            inputElements.forEach((inputElement) => {
                inputElement.checked = true;
            });
        } else if (value === "2") {
            const inputElements = document.querySelectorAll('.checkbox-cart');
            inputElements.forEach((inputElement) => {
                inputElement.checked = false;
            });
        }
    }
    const updateQuantity=(id,quantity)=>{
        const data={
          quantity:quantity,
        }
        dispatch(updateCartID(id,data, user_id));
      }
    const deleteCart = (id) => {
        let arr = []
        arr.push(id)

        confirmAlert({
            title: 'Xóa sản phẩm',
            message: 'Bạn có muốn xóa sản phẩm này không?',
            buttons: [
                {
                    label: (
                        <span>
                            Đồng ý
                        </span>
                    ),
                    onClick: () => {
                        const data = {
                            arrId: arr
                        }
                        deleteCartDeatil(data)
                    }
                },
                {
                    label: (
                        <span>
                            Hủy
                        </span>
                    ),
                    onClick: () => {
                    }
                }
            ]
        });
    }
    const deleteCartDeatil = (data) => {
        dispatch(deleteCartID(data, user_id));

    }
    const changeChecked = (e, quantity, price) => {
        const ischecked = e.target.checked
        const changeAmount = ischecked ? 1 : -1;
        const changequantity = ischecked ? quantity : -quantity;
        const changeprice = ischecked ? (price * quantity) : -(price * quantity);
        setQuantityAll((quantityCart) => quantityCart + changequantity);
        setmoney((money) => money + changeprice)
        setNumberProduct((prevNumberProduct) => prevNumberProduct + changeAmount);
    }
    const payying = () => {
        if(money>0){
            const checkedValues = [];
            const checkedInputs = document.querySelectorAll('.checkbox-cart');
            checkedInputs.forEach((input) => {
              if (input.checked) {
                checkedValues.push(input.value);
              }
            });
            navigate('/payying', { state: { data: checkedValues } });
        }
        else{
            toast.error("Vui lòng chọn sản phẩm để thanh toán")
        }
      }
      
    return (
        <div className='pg-85-t flex_center deatil'>
            <div className='container-main row'>
                <h4 className='titel-c-drak '>Giỏ hàng của bạn</h4>
                <div className='col-12 pg-25 flex_start'>
                        <Form.Select className='w-300' onChange={changeSelect}>
                            <option>Chọn hành động</option>
                            <option value="1">Chọn tất cả</option>
                            <option value="2">Bỏ chọn tất cả</option>

                        </Form.Select>
                        <div className='btn-cart-deatil btn-cart-update bg-yellow-og'>
                            Xóa
                        </div>
                    </div>
                <div className='col-xl-9 col-sm-12'>
                
                    <Table className='Table' >
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Sản phẩm</th>
                                <th>Màu sắc/Size</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list_cart.map((item, index) => {
                                return (
                                    <tr>
                                        <td>
                                            <input type='checkbox'
                                                className='checkbox-cart'
                                                value={item.id}
                                                onChange={(e) => changeChecked(e, item.quantity, item.price)}
                                            />

                                            {index + 1} </td>
                                        <td className="product-cell">
                                            <div className='flex_start'>
                                                <img className='img-small-cart' src={item.img} />
                                                <Link to={`/deatil/${item.product_id}`}>{item.name}</Link>
                                            </div>
                                        </td>
                                        <td>{item.color}/{item.size}</td>
                                        <td>
                                            <div className='deatil-row quantity mg-15-0'>
                                                <div className='flex_center acction-quantity w-h-30' onClick={() => decreaseQuantity(item.id)} >
                                                    <span>-</span>
                                                </div>

                                                <input type='text' className="h-30" value={quantityList[item.id] || 1} />
                                                <div className='flex_center acction-quantity w-h-30' onClick={() => increaseQuantity(item.id)} >
                                                    <span>+</span>
                                                </div>

                                            </div>
                                        </td>
                                        <td>{formatPrice(item.price)}</td>
                                        <td><div className='flex_center'>
                                            <div className='btn-cart-deatil btn-cart-update bg-red-blink' onClick={()=>updateQuantity(item.id,quantityList[item.id])}>
                                                Cập nhật
                                            </div>
                                            <div className='btn-cart-deatil btn-cart-update bg-yellow-og' onClick={() => deleteCart(item.id)}>
                                                Xóa
                                            </div>
                                        </div> </td>
                                    </tr>
                                )
                            })}


                        </tbody>
                    </Table>
                </div>
                <div className='col-xl-3 col-sm-12'>
                    <div>
                    <Table>
                            <thead>
                                <tr>
                                    <th>Mô tả</th>
                                    <th>Nội dung</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Số Sản phẩm :</td>
                                    <td>{numberProduct} </td>
                                </tr>
                                <tr>
                                    <td>tổng số lượng :</td>
                                    <td>{quantityAll}</td>
                                </tr>
                                <tr>
                                    <td>Thành tiền :</td>
                                    <td>{formatPrice(money)}</td>
                                </tr>
                                <tr>
                                    <td>Phí ship :</td>
                                    <td>{formatPrice(moneyShip)}</td>
                                </tr>
                                <tr>
                                    <td>Tổng tiền :</td>
                                    <td>{formatPrice(money+moneyShip)}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <button className='paying-btn flex_center' onClick={payying}>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <p>Thanh toán</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mycart