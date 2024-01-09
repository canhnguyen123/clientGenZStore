import React, { useRef, useState } from "react";
import Banner from '../../components/banner';
import { Virtual, Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BlogItem from "../../components/blogItem";
import "swiper/css";
function Blog() {
  const [swiperRef, setSwiperRef] = useState(null);
  const prependNumber = useRef(1);
  const [slides, setSlides] = useState(
    Array.from({ length: 50 }).map((_, index) => `Slide ${index + 1}`)
  );

  const prepend = () => {
    setSlides([
      `Slide ${prependNumber.current - 2}`,
      `Slide ${prependNumber.current - 1}`,
      ...slides,
    ]);
    prependNumber.current = prependNumber.current - 2;
    swiperRef.slideTo(swiperRef.activeIndex + 2, 0);
  };

  return (
    <div className="pg-85-t ">
        <Banner/>   
       <div className='container-main mg-center pg-50'>
        <h4 className="titel-c-drak">
          Các bài viết nổi bật
        </h4>
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
              slidesPerView: 4,
            },
            0: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
          }}
      navigation={true}
        
      >
        {slides.map((slideContent, index) => (
          <SwiperSlide key={slideContent} virtualIndex={index}>
               <BlogItem/>
          </SwiperSlide>
        ))}
      </Swiper>
      <h4 className="titel-c-drak">
          Danh sách bài viết
        </h4>
      <div className="list-blog">
          <BlogItem/>
          <BlogItem/>
          <BlogItem/>
          <BlogItem/>
      </div>
       </div>
    </div>
  )
}

export default Blog