import React from 'react';
import Slider from './ingredient/slider';
import StikerSlider from './ingredient/stikerSlider';
import Product from './ingredient/product';
function home() {
  return (
    <div className='home'>
        <Slider/>
        <h4 className='titel-h4'>
            Các thể loại được yêu thích
        </h4>
        <StikerSlider/>
        <h4 className='titel-h4'>
            Các sản phẩm theo thể loại
        </h4>
        <Product/>
    </div>
  )
}

export default home
