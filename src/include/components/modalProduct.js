import { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../redux/action/acction';
import { getDeatil,addToMyCart} from '../../service/funApi';
import { formatPrice } from '../../service/funweb';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalProduct({ status }) {
    const dispatch = useDispatch();
    const modalProduct = useSelector((state) => state.reducers.modalProduct);
    const product_id = useSelector((state) => state.reducers.product_id);
    const productDeatil = useSelector((state) => state.product.productDeatil);
    const [quantity, setQuantity] = useState(1);
    const [size, setsize] = useState('');
    const [color, setcolor] = useState('');
    let [selectedPrice, setSelectedPrice] = useState(0);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const user_id = localStorage.getItem('user_id');
    useEffect(() => {
        if (modalProduct === true) {
          dispatch(getDeatil(product_id));
        }
      }, [dispatch, product_id, modalProduct]);
      
      useEffect(() => {
        if (productDeatil) {
          if (productDeatil.sizeList) {
            setsize(productDeatil.sizeList[0]);
          } 
         if (productDeatil.colorList) {
            setcolor(productDeatil.colorList[0]);
          } 
    
          setIsDataLoaded(true); 
        }
      }, [productDeatil]);
    const handleClose = () => {
        dispatch(closeModal());

    };

    if (!modalProduct || !productDeatil) {
        return null;
    }
    const addToCart=()=>{
        if(user_id!==0&&user_id!==null){
            const  data={
            product_id:product_id,
            card_size:size,
            card_color:color,
            card_quantity:quantity
        }
        setQuantity(1)
        dispatch(addToMyCart(data,user_id))
        }
        else{
            toast.error('Đăng nhập để thêm vào giỏ hàng')
        }
    }
    const chaneSize = (size) => {
        setsize(size);
    }

    const chaneColor = (color) => {
        setcolor(color);
    }

    const chanQuantity = (event) => {
        const newValue = event.target.value;

        if (isNaN(newValue)) {
            toast.error('Số lượng phải là dạng số', {});
            setQuantity(1);
        } else if (newValue < 0) {
            toast.error('Số lượng không được nhỏ hơn 0', {});
            setQuantity(1);
        } else {
            const numericValue = parseInt(newValue, 10);
            setQuantity(numericValue);
        }
    }
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        };
    }
    
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }
    const finePrice = () => {
        const  price = productDeatil.quantity.find((item) => {
                    return item.size === size && item.color === color && item.quantity_ > 0;
                });
        if (price) {
            if (selectedPrice !== price.price) {
                setSelectedPrice(price.price);
            }
            return <p>Giá sản phẩm: {formatPrice(price.price)}</p>;
        } else {
            if (selectedPrice !== 0) {
                setSelectedPrice(0);
            }
            return <p>Không có sản phẩm có giá và màu này chọn cái khác hoặc hết hàng</p>;
        }
    }

    return (
        <div className={`modal-box flex_center`}>
            <div className='modal-content modal'>
              
                <i className="fa-solid fa-xmark close-cart" onClick={handleClose}></i>
                <div className='session-modal'>
                    <label>Size :</label>
                    <br />
                    <div className='list-span'>
                        { productDeatil?.sizeList 
                        ? 
                            productDeatil.sizeList.map((itemSize) => {
                                return (
                                    <div className={`item-span flex_center ${size === itemSize ? 'active' : ''}`} onClick={() => chaneSize(itemSize)}>
                                        <span>{itemSize}</span>
                                    </div>
                                )
                            })
                        : null
                    }
                    </div>
                </div>
                <div className='session-modal'>
                    <label>Màu sắc :</label>
                    <br />
                    <div className='list-span'>
                        { productDeatil.colorList 
                            ?
                                productDeatil.colorList.map((itemColor) => {
                                    return (
                                        <div className={`item-span flex_center ${color === itemColor ? 'active' : ''}`} onClick={() => chaneColor(itemColor)}>
                                            <span>{itemColor}</span>
                                        </div>
                                    )
                                })
                            : null
                        }
                    </div>
                </div>
                <div className='session-modal mg-15-0'>
                    {color !== "" && size !== "" ? finePrice() : ""}
                </div>
                <div className='quantity mg-15-0'>
                    <div className='flex_center acction-quantity' onClick={decreaseQuantity}>
                            <span>-</span>
                        </div>
                        <input type='text' value={quantity} onChange={chanQuantity} />
                        <div className='flex_center acction-quantity' onClick={increaseQuantity}>
                            <span>+</span>
                        </div>
                </div>
                <div className='session-modal mg-15-0'>
                    <button className='btn-acction flex_center' onClick={addToCart}>
                        <p>Thêm vào giỏ hàng</p>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalProduct

