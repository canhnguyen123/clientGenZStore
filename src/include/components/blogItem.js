import React from 'react'
import { Link } from 'react-router-dom'
function blogItem() {
  return (
    <Link>
     <div className='item-blog'>
        <div className='blog-img'>
            <img src='https://uniqlo-minimal.myshopify.com/cdn/shop/products/3_22b86be5-8d7b-4cbc-a2a2-c522bbfb46f4_grande.jpg?v=1505733074'/>
        </div>
        <div className='blog-intro flex_start'>
            <h5 className='blog-titel'>
                Chọn size quần áo sao cho chuẩn
            </h5>
        </div>
    </div>
    </Link>
   
  )
}

export default blogItem
