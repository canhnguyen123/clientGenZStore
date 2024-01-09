import  { useState,useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Virtual, Navigation,Autoplay } from 'swiper/modules';
import { useSelector, useDispatch } from 'react-redux';
import {getBanner} from '../../../../service/funApi';
export default function App() {
  const dispatch = useDispatch();
  const banner = useSelector((state) => state.theLoai.banner);
  useEffect(() => {
    dispatch(getBanner()); 
  }, [dispatch]);
  return (
    <>
      <Swiper
          modules={[Virtual, Navigation, Autoplay]}
          loop={true}
          autoplay={{
            delay: 5000, // 5 giây
            disableOnInteraction: false,
          }}
          navigation={true}
          className="mySwiper slider-home"
        >
        {banner.map((item,index)=>{
          return(
            <SwiperSlide>
              <img src={item.linkImg}/>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  );
}
