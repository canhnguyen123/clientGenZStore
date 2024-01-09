import React, { useState, useEffect } from 'react';
import ItemProduct from '../../components/itemProduct';
import { useSelector, useDispatch } from 'react-redux';
import { geListProductAllPage } from '../../../service/funApi';
import ReactPaginate from 'react-paginate';

function Product() {
  const dispatch = useDispatch();
  const listproductAll = useSelector((state) => state.product.productAll);
  const totalProductAll = useSelector((state) => state.product.totalProductAll);
  const pageProductAll = useSelector((state) => state.product.pageProductAll);
  const limitProductAll = useSelector((state) => state.product.limitProductAll);
  useEffect(() => {
    dispatch(geListProductAllPage(pageProductAll+1));
  }, [dispatch]);
  const pageCount = Math.ceil(totalProductAll / limitProductAll);
  const handlePageClick = ({ selected }) => {
    dispatch(geListProductAllPage(selected+1));
  };
  return (
    <div className='pg-85-t flex_center'>
      <div className='container-main'>
        <h4 className='titel-h4'>Danh sách sản phẩm</h4>
        <div className='fitter-product'></div>
        <div className='list-product row'>
          {listproductAll.map((item, index) => (
            <ItemProduct key={index} id={item.id} name={item.name} imgLink={item.img} price={item.price} />
          ))}
        </div>
        <div className='flex_center'>
        <ReactPaginate
          previousLabel={'<<'}
          nextLabel={'>>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={4}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
        </div>
      </div>
    </div>
  );
}

export default Product;
