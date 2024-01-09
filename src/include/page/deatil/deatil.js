import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useSelector, useDispatch } from 'react-redux';
import { getDeatil, addToMyCart, getListCmtDeaful, postAPICmt, checkLogin } from '../../../service/funApi';
import { formatPrice } from '../../../service/funweb';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ItemCmt from '../../components/itemCmt';
import { updateRepLyId,updateReqText } from '../../../redux/action/productAcction';
import ItemPrduct from "../../components/itemProduct";
import {getProducTrelateTo} from "../../../service/funApi";
function Deatil() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { product_id } = useParams();
    const productDeatil = useSelector((state) => state.product.productDeatil);
    const repLyIdText = useSelector((state) => state.product.repLyIdText);
    const [listProducTrelateTo,setListProducTrelateTo]=useState([]);
    const repLyId = useSelector((state) => state.product.repLyId);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [size, setsize] = useState('');
    const [color, setcolor] = useState('');
    const listCmt = useSelector((state) => state.product.listCmt);
    const user_id = localStorage.getItem('user_id');
    const [valueInput, setValueInput] = useState('')
    let [selectedPrice, setSelectedPrice] = useState(0);
    const theloaiId=productDeatil.theloai_id ??1;

    useEffect(() => {
        if (productDeatil) {
            if (productDeatil.sizeList) {
                setsize(productDeatil.sizeList[0]);
            }
            if (productDeatil.colorList) {
                setcolor(productDeatil.colorList[0]);
            }
        }
    }, [productDeatil]);
    useEffect(() => {
        dispatch(getDeatil(product_id));
    }, [dispatch, product_id]);

    useEffect(() => {
        dispatch(getListCmtDeaful(product_id));
    }, [dispatch, product_id]);
    const chaneSize = (size) => {
        setsize(size);
    }
    useEffect(()=>{
        getProducTrelateTo(theloaiId,setListProducTrelateTo);
    },[theloaiId])
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
        const price = productDeatil.quantity.find((item) => {
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
    const addToCart = () => {

        if (checkLogin()) {
            const data = {
                product_id: product_id,
                card_size: size,
                card_color: color,
                card_quantity: quantity
            }

            dispatch(addToMyCart(data, user_id))
        }
    }
    const buyNow = () => {
        let checkedValues = [];
        checkedValues.push(product_id);
        navigate('/payying', { state: { data: checkedValues } });
    }
    const sumbitCmt = (e) => {
        e.preventDefault();
        if(valueInput.trim().length>0){
            if (checkLogin()) {
                const data = {
                    resMessId:repLyId,
                    user_id: user_id,
                    context: valueInput
                }
                dispatch(postAPICmt(product_id, data,setValueInput))
            }
        }else{
            toast.error("không được bỏ trống ô nhập !")
        }

    }
    const cancel=()=>{
        dispatch(updateRepLyId(null));
        dispatch(updateReqText(null));
        document.querySelector('.btn-cancel').classList.remove('active');
        document.querySelectorAll('.cmt-item.active').forEach((element) => {
            element.classList.remove('active');
        });
    }
    return (
        <div className='pg-85-t flex_center deatil'>
            <div className='container-main row'>
                <h4 className='titel-c-drak '>Chi tiết sản phẩm</h4>
                <div className='col-xl-4 col-sm-12'>
                    <Swiper
                        style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff',
                        }}
                        loop={true}
                        spaceBetween={10}
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2"
                    >
                        {productDeatil?.images
                            ?
                            productDeatil.images.map((item) => {
                                return (
                                    <SwiperSlide>
                                        <img src={item} />
                                    </SwiperSlide>
                                )
                            })
                            : null
                        }

                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={4}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                    >

                        {productDeatil?.images
                            ?
                            productDeatil.images.map((item) => {
                                return (
                                    <SwiperSlide>
                                        <img src={item} />
                                    </SwiperSlide>
                                )
                            })
                            : null
                        }
                    </Swiper>
                </div>
                <div className='col-xl-8 col-sm-12'>
                    <div className='deatil-row '>
                        <h4 className='titel-c-drak'>
                            {productDeatil.name}
                        </h4>
                    </div>
                    <div className='deatil-row pg-15'>
                        <span>Mã sản phẩm : {productDeatil.brand_code}</span>
                    </div>
                    <div className='deatil-row pg-15'>
                        <span>Thể loại : {productDeatil.theloai_name}</span>
                    </div>
                    <div className='deatil-row pg-15'>
                        <span>Danh mục : {productDeatil.category_name} </span>
                    </div>
                    <div className='deatil-row pg-15'>
                        <span>Phân loại : {productDeatil.phanloai_name}</span>
                    </div>
                    <div className='deatil-row pg-15'>
                        <span>Thương hiệu : Jody</span>
                    </div>
                    <div className='deatil-row pg-15'>
                        <label>Size :</label>
                        <br />
                        <div className='list-span'>
                            {productDeatil?.sizeList
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
                    <div className='deatil-row pg-15'>
                        <label>Màu sắc :</label>
                        <br />
                        <div className='list-span'>
                            {productDeatil.colorList
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
                    <div className='deatil-row pg-15'>
                        <p className='flex_start'>  {color !== "" && size !== "" ? finePrice() : ""}</p>
                    </div>
                    <div className='deatil-row pg-15'>
                        <span>Chất liệu : vải bò, vải cotton</span>
                    </div>
                    <div className='deatil-row quantity mg-15-0'>
                        <div className='flex_center acction-quantity' onClick={decreaseQuantity}>
                            <span>-</span>
                        </div>

                        <input type='text' value={quantity} onChange={chanQuantity} />
                        <div className='flex_center acction-quantity' onClick={increaseQuantity} >
                            <span>+</span>
                        </div>

                    </div>
                    <div className='deatil-row flex_start flex_warp pg-15'>
                        <button className='btn-acction flex_center mg-l-r-15px' onClick={buyNow}><i class="fa-solid fa-bag-shopping" ></i>  <p>Mua hàng</p></button>
                        <button className='btn-acction flex_center mg-l-r-15px bg-yellow' onClick={addToCart}> <i class="fa-solid fa-cart-plus"></i> <p>Thêm vào giỏ hàng</p></button>
                    </div>
                    <div className='deatil-row pg-15'>
                        <Tabs
                            defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="home" title="Mô tả">
                                <div dangerouslySetInnerHTML={{ __html: productDeatil.mota }} />


                            </Tab>
                            <Tab eventKey="profile" title="Đặc điểm">
                                <div dangerouslySetInnerHTML={{ __html: productDeatil.dacdiem }} />

                            </Tab>
                            <Tab eventKey="contact" title="Bảo quản">
                                <div dangerouslySetInnerHTML={{ __html: productDeatil.baoquan }} />

                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <h4 className='titel-c-drak '>Sản phẩm liên quan</h4>
                <div className='row'>
                {listProducTrelateTo&& listProducTrelateTo.map((item,index)=>{
                return(
                  <ItemPrduct id={item.id} name={item.name} imgLink={item.img} price={item.price} />
                )
              })}
                </div>
                <div class="col-12 div-cmt-box">
                    <div class="box-cmt-header flex_center">
                        <h4>Bình luận sản phẩm</h4>
                    </div>
                    <div class=" list-cmt">
                        {listCmt && listCmt.length > 0 && listCmt.map((item, index) => {
                            return (
                                <ItemCmt data={item} />
                            )
                        })}
                    </div>
                    <div class="form-input-cmt flex_center">
                        <form action="" class="form-input-cmt-content" onSubmit={sumbitCmt}>
                            <span className='text-repLy'>{repLyIdText}</span>
                            <input type="text" class="input-cmt" value={valueInput} onChange={(e) => setValueInput(e.target.value)} placeholder="Nhập bình luận" />
                            <div class="btn-post-cmt flex_center" onClick={sumbitCmt}>
                                <i class="fa-solid fa-arrow-right"></i>
                            </div>
                            <div class="btn-cancel flex_center" onClick={cancel}     >
                               <i class="fa-solid fa-ban" ></i>
                            </div>
                           
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Deatil