import React, { useState, useEffect } from 'react';
import TheloaiItem from '../../components/itemTheLoai';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoryList, getPhanLoaiList,getTheLoaiCase } from '../../../service/funApi';

function Bye() {
  const dispatch = useDispatch();
  const [categoryId, setCategoryID] = useState(0);
  const [phanLoaid, setPhanLoaiId] = useState(0);
  const [theLoaiId, setTheLoaiId] = useState(0);
  const phanLoaiList = useSelector((state) => state.theLoai.phanLoai);
  const categoryList = useSelector((state) => state.theLoai.category);
  const listTheLoai = useSelector((state) => state.theLoai.listTheLoai);
  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getPhanLoaiList());
  }, [dispatch]);
   useEffect(() => {
    if (categoryList.length > 0) {
      setCategoryID(categoryList[0].id);
    }
    if (phanLoaiList.length > 0) {
      setPhanLoaiId(phanLoaiList[0].id);
    }
  }, [categoryList, phanLoaiList]);

  const chaneCategory = (id) => {
    setCategoryID(id);
  };
  const chanePhanLoai = (id) => {
    setPhanLoaiId(id);
  };
  useEffect(() => {
        if (categoryId !== 0 && phanLoaid !== 0) {
          const data = {
            category_id: categoryId,
            phanloai_id: phanLoaid,
          };
          dispatch(getTheLoaiCase(data));
        }
      }, [dispatch, categoryId, phanLoaid]);

  return (
    <div className='pg-85-t flex_center'>
      <div className='container-main'>
        <h4 className='titel-c-drak'>
            Danh sách thể loại
        </h4>
        <div className='list-category'>
          <ul>
            {categoryList.map((item) => (
              <li
                 className={`flex_center ${item.id === categoryId ? 'active' : ''}`}
                onClick={() => chaneCategory(item.id)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className='list-content-main'>
          <div className='list-phanloai'>
            <ul>
              {phanLoaiList.map((item) => (
                <li 
                className={`flex_start ${item.id === phanLoaid ? 'active' : ''}`}
                onClick={() => chanePhanLoai(item.id)}>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <div className='list-theloai'>
            {listTheLoai.map((item,index)=>{
                return(
                    <TheloaiItem 
                    link={item.link}  
                    name={item.name}
                    id={item.id}/>
                )
            })}
         
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bye;
