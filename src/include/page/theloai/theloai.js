import {useEffect,useState} from 'react'
import ItemProduct from '../../components/itemProduct';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getProductCase } from '../../../service/funApi';

function Theloai() {
  const { theloai_id } = useParams();
  const dispatch = useDispatch();
  const theloaiList = useSelector((state) => state.product.productListCase);
  useEffect(() => {
    dispatch(getProductCase(theloai_id)); 
  }, [dispatch,theloai_id]);
  return (
    <div className='pg-85-t flex_center'>
      <div className='container-main'>
      <h4 className='titel-c-drak'>
            Danh sách sản phẩm theo thể loại
        </h4>
          <div className='list-product'>
            {theloaiList.map((item,index)=>{
              return(
                <ItemProduct  
                  id={item.id} 
                  name={item.name} 
                  imgLink={item.img} 
                  price={item.price} 
                />
              )
            })}
               
          </div>
      </div>
    
  </div>
  )
}

export default Theloai