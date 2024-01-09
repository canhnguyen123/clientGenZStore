import  { useState,useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ItemProduct from '../../../components/itemProduct';
import { useSelector, useDispatch } from 'react-redux';
import {getCheckedTL,getProduct} from '../../../../service/funApi';

function Product() {
  const dispatch = useDispatch();
  const theloaiList = useSelector((state) => state.theLoai.theloaiChecked);
  const productList = useSelector((state) => state.product.productList);
  const [theloai_id,setTheLoai_id]=useState(0); 
  useEffect(() => {
    dispatch(getCheckedTL()); 
  }, [dispatch]);
  useEffect(() => {
    if (theloaiList.length > 0) {
      setTheLoai_id(theloaiList[0].id);
    }
  }, [theloaiList]);
  useEffect(() => {
    dispatch(getProduct(theloai_id)); 
  }, [dispatch,theloai_id]);
  const chaneId=(theloai_id)=>{
    setTheLoai_id(theloai_id)
    dispatch(getProduct(theloai_id)); 
  }
  return (
    <Tabs
      defaultActiveKey="0"
      className="mb-3"
      onSelect={(key) => chaneId(theloaiList[key].id)}
    >
      {theloaiList.map((item,index)=>{
        return(
          <Tab key={item.id} eventKey={index} title={item.name} 
          >
          <div className='list-product'>
             
              {productList.map((item,index)=>{
                return(
                  <ItemProduct id={item.id} name={item.name} imgLink={item.img} price={item.price} />
                )
              })}
          </div>
    </Tab>
        )
      })}

    </Tabs>
  );
}

export default Product;