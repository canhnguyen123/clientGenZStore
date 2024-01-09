import  { useState,useEffect } from 'react';
import { Virtual, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector, useDispatch } from 'react-redux';
import {getListTheLoaiHome} from '../../../../service/funApi';
import TheLoaiItem from '../../../components/itemTheLoai';
export default function App()  {
 
  const dispatch = useDispatch();
  const theloaiList = useSelector((state) => state.theLoai.theloaiList);
  useEffect(() => {
    dispatch(getListTheLoaiHome()); 
  }, [dispatch]);
  return (
    <>
      <Swiper
        modules={[Virtual, Navigation, Autoplay]}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
            960: {
              spaceBetween: 12,
              slidesPerView: 6,
            },
            0: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
          }}
      navigation={true}
        
      >
        {theloaiList.map((item, index) => (
          <SwiperSlide className='sticker-slider'>
               <TheLoaiItem name={item.name} link={item.linkImg} id={item.id} />
          </SwiperSlide>
        ))}
      </Swiper>

    
    </>
  );
}
