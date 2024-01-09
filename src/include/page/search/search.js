import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Listsearch } from '../../../redux/action/acction';
import ItemProduct from '../../components/itemProduct';
import { useNavigate } from 'react-router-dom';

function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listProduct = useSelector((state) => state.reducers.searchList);
  const isSearch = useSelector((state) => state.reducers.isSearch);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(Listsearch());
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi tải danh sách sản phẩm:', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [dispatch]);
  
  
  useEffect(() => {
    if (!loading) {
      navigate('/search');
    }
  }, [loading, listProduct]);
  

  return (
    <div className='pg-85-t flex_center'>
      <div className='container-main'>
        <h4 className='titel-c-drak'>Kết quả tìm kiếm</h4>
        <div className='list-product'>
        {isSearch??isSearch===true?
        ( listProduct && listProduct.length > 0 ? (
          listProduct.map((item, index) => (
            <div key={index}>
              <ItemProduct
                id={item.id}
                name={item.name}
                imgLink={item.img}
                price={item.price}
              />
            </div>
          ))
        ) : (
          <div className='flex_center pd-50'>
            <p>Không có sản phẩm nào</p>
          </div>
        ))
         :(  
          <div className='flex_center pd-50'>
          <p>Tìm kiếm sản phẩm để có kết quả</p>
        </div>)
        }

        </div>
      </div>
    </div>
  );
}

export default Search;
