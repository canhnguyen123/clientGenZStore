import React from 'react'
import {SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
function itemTheLoai(props) {
  
  return (
    <Link to={`/theloai/${props.id}`}>
        <SwiperSlide className='sticker-slider item-theloai'>
            <img src={props.link}/>
            <div className='theloai-infro flex_center'>
               <span>{props.name}</span>
            </div>
           
         </SwiperSlide>
    </Link>
    
  )
}

export default itemTheLoai