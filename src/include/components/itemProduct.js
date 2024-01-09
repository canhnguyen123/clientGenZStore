import React, { useState } from 'react';
import {useDispatch } from 'react-redux';
import{openModal,addToCart} from '../../redux/action/acction'
import { Link } from 'react-router-dom';
import {formatPrice} from "../../service/funweb";
import { toast } from 'react-toastify';
import {addMyHeart} from "../../service/funApi"
function ItemProduct(props) {
    const dispatch = useDispatch();
        const openModalProduct=(event,status)=>{
            event.preventDefault();
            dispatch(openModal(props.id));
        }
        const addToHeart=(event)=>{
            event.preventDefault();
            const user_id=localStorage.getItem('user_id');  
            if(user_id&&user_id!==null&&user_id>0){
                 let listProduct=[];
                 listProduct.push(props.id);
                 const data={
                    productId_list:listProduct,
                 }
                dispatch(addMyHeart(user_id,data))
            }else{
                const data={
                    id:props.id,
                    img:props.imgLink,
                    name:props.name,
                    price:props.price,
                }
                dispatch(addToCart(data));
                toast.success("Thêm thành công");
            }
        
        }
  return (
    <Link to={`/deatil/${props.id}`} className='col-xl-3 col-lg-4 col-md-6 col-sm-12'>
         <div className='item-product'>
        <div className='product-img'>
            <div className='add-my-cart flex_center'>
                    <div className='flex_center btn-cart-acction'  onClick={(event)=>addToHeart(event)}>
                        <i class="fa-solid fa-heart"></i>
                    </div>
                    <div
                   onClick={(event)=>openModalProduct(event)}
                    className='flex_center btn-cart-acction add-cart-icon'>
                        <i class="fa-solid fa-cart-plus" ></i>
                    </div>
            </div>
            <img src={props.imgLink}/>
        </div>
        <div className='product-infro'>
            <h5>{props.name}</h5>
            <p> {formatPrice(props.price)}</p>
        </div>
    </div>
    </Link>
   
  )
}

export default ItemProduct;
