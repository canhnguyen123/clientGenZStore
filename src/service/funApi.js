// service.js
import APILink from "./APILink";
import { getTLHomeAcction,getTLChecked,getBannerHome,getCategory,getPhanLoai,getTheLoai } from "../redux/action/theLoaiAcction";
import { getProductHome,getProductInTL,getDeatilProduct,getListCmt,appenListCmt,getListProductAll,updateTotal,getListPage,updateLimit } from "../redux/action/productAcction";
import {loginAcction,updateIdAcction} from "../redux/action/accountAcction";
import {getListCart} from "../redux/action/cartAcction";
import {Listsearch,toggleSearch,deafulCart,getListHeartApi,deafulHeartAPI} from "../redux/action/acction";
import {getListNotification} from "../redux/action/notificationAcction"
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {updateRepLyId,updateReqText} from "../redux/action/productAcction";
export const getListTheLoaiHome = () => {
    return (dispatch) => {
        APILink.get('theloai/')
          .then((response) => {
            if(response.data.status==="success"){
                dispatch(getTLHomeAcction(response.data.results));
            }
         
          })
          .catch((error) => {
          });
      }
};
export const getCheckedTL = () => {
  return (dispatch) => {
      APILink.get('theloai/get-check-list-home')
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getTLChecked(response.data.results));
          }
       
        })
        .catch((error) => {
        });
    }
};
export const getBanner = () => {
  return (dispatch) => {
      APILink.get('banner/')
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getBannerHome(response.data.results));
          }
       
        })
        .catch((error) => {
        });
    }
};
export const getCategoryList = () => {
  return (dispatch) => {
      APILink.get('theloai/get-category')
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getCategory(response.data.results));
          }
       
        })
        .catch((error) => {
        });
    }
};
export const getPhanLoaiList = () => {
  return (dispatch) => {
      APILink.get('theloai/get-phanloai')
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getPhanLoai(response.data.results));
          }
       
        })
        .catch((error) => {
        });
    }
};
export const getProduct = (id) => {
  return (dispatch) => {
      APILink.get(`product/list-product/${id}/4`)
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getProductHome(response.data.results));
          }
       
        })
        .catch((error) => {
        });
    }
};
export const getProducTrelateTo=(theloai_id,setListProduct) => {
      APILink.get(`product/list-product/${theloai_id}/4`)
        .then((response) => {
          if(response.data.status==="success"){
              setListProduct(response.data.results);
              console.log(response.data.results);
          }
       
        })
        .catch((error) => {
        });
};
export const getTheLoaiCase = (data) => {
  return (dispatch) => {
      APILink.post('theloai/fitter-theloai',data)
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getTheLoai(response.data.results));
          }
       
        })
        .catch((error) => {
        });
    }
};

export const getProductCase= (theloai_id) => {
  return (dispatch) => {
      APILink.get(`product/case/${theloai_id}`)
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getProductInTL(response.data.results));
          }
       
        })
        .catch((error) => {
        });
    }
};



export const getDeatil= (product_id) => {
  return (dispatch) => {
      APILink.get(`product/deatil/${product_id}`)
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getDeatilProduct(response.data.results));
          }
        })
        .catch((error) => {
        });
    }
};
export const login = (data,navigate,heartLoveList) => {
 
  return (dispatch) => {
      APILink.post('user/login',data)
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(loginAcction(response.data.user_id));
              toast.success(response.data.mess,{})
              console.log(heartLoveList)
              dispatch(updateIdAcction(true))
              localStorage.setItem('user_id',response.data.user_id);
                 setTimeout(() => {
                  navigate('/');
              }, 2000);
              if(heartLoveList.length>0){
                const user_id=localStorage.getItem('user_id');  
                const idArray = heartLoveList.map(item => item.id);
                const data={
                  listHeartdPost: idArray,
                }
                // dispatch(postAddCart(user_id,data));
                dispatch(deafulCart());
              }
          }
          else if(response.data.status==="fail"){
            toast.success(response.data.mess,{})
          }
        })
        .catch((error) => {
        });
    }
};
export const logout = (navigate) => {
   return (dispatch) => {
        toast.success("Đăng xuất thành công",{})
        localStorage.removeItem('user_id');
            setTimeout(() => {
              navigate('/acction');
          }, 2000);
          dispatch(deafulHeartAPI())
          dispatch(updateIdAcction(false))
    }
};
export const checkLogin = () => {
  var user_id = localStorage.getItem('user_id');
  if (user_id && user_id !== null && user_id > 0) {
    return true;
  } else {
    toast.error('Vui lòng đăng nhập để thực hiện tiếp !');
    return false;
  }
};

export const loginAccount = (data,navigate,heartLoveList) => {
 
  return (dispatch) => {
      APILink.post('user/dangki-acction',data)
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(loginAcction(response.data.user_id));
              toast.success(response.data.mess,{})
              setTimeout(() => {
                navigate('/');
             }, 2000);
              dispatch(updateIdAcction(true))
              localStorage.setItem('user_id',response.data.user_id);
              if(heartLoveList.length>0){
                const user_id=localStorage.getItem('user_id');  
                const idArray = heartLoveList.map(item => item.id);
                const data={
                  listHeartdPost: idArray,
                }
                console.log(data)
                // dispatch(postAddCart(user_id,data));
                dispatch(deafulCart());
              }
          }
          else if(response.data.status==="fail"){
            toast.success(response.data.mess,{})
          }
        })
        .catch((error) => {
        });
    }
};
export const checkIsLogin = (navigate) => {
  return () => {
    const user_id = localStorage.getItem('user_id');
    if (user_id !== null && user_id !== '0') { // Kiểm tra user_id có khác null và '0'
      toast.success('Đã có tài khoản, bạn sẽ được chuyển về trang chủ', {})
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  };
}
export const getListMyCart= (user_id) => {
  return (dispatch) => {
      APILink.get(`cart/get-list-cart/${user_id}`)
        .then((response) => {
          if(response.data.status==="success"){
              dispatch(getListCart(response.data.results));
          }
        })
        .catch((error) => {
        });
    }
};

export const addToMyCart= (data,user_id) => {
  return (dispatch) => {
      APILink.post(`cart/add/${user_id}`,data)
        .then((response) => {
          if(response.data.status==="success"){
             dispatch(getListMyCart(user_id));
             toast.success(response.data.mess, {})
          }
          else{
            toast.error(response.data.mess, {})
          }
         // alert(response.data.status)
        })
        .catch((error) => {
        });
    }
};
export const getListPageMyCart = (user_id) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      APILink.get(`cart/get-list/${user_id}`)
        .then((response) => {
          if (response.data.status === "success") {
            dispatch(getListCart(response.data.results));
            resolve(response.data.results);  
          } else {
            reject("Error: Failed to fetch cart data");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
};
export const deleteCartID = (data,user_id) => {
  return (dispatch) => {
    APILink.post(`cart/delete/${user_id}`,data)
    .then((response) => {
      if (response.data.status === "success") {
        dispatch(getListPageMyCart(user_id));
        dispatch(getListMyCart(user_id));
        toast.success(response.data.mess,{})
      } else {
        toast.error(response.data.mess,{})
      }
    })
    .catch((error) => {
     
    });
  };
};
export const updateCartID = (id,data,user_id) => {
  return (dispatch) => {
    APILink.put(`cart/update/${id}`,data)
    .then((response) => {
      if (response.data.status === "success") {
        dispatch(getListPageMyCart(user_id));
        dispatch(getListMyCart(user_id));
        toast.success(response.data.mess,{})
      } else {
        toast.error(response.data.mess,{})
      }
    })
    .catch((error) => {
     
    });
  };
};
export const get_listNotification = (user_id) => {
  return (dispatch) => {
    APILink.get(`notification/list-notification/${user_id}`)
    .then((response) => {
      if (response.data.status === "success") {
        dispatch(getListNotification(response.data.results));
      
      } else {
        toast.error(response.data.mess,{})
      }
    })
    .catch((error) => {
     
    });
  };
};

export const updateNotification = (user_id,data) => {
  return (dispatch) => {
    APILink.post(`notification/update-state/${user_id}`,data)
    .then((response) => {
      if (response.data.status === "success") {
        dispatch(get_listNotification(user_id));
        toast.success(response.data.mess)
      } else {
        toast.error(response.data.mess,{})
        toast.success(response.data.mess)
      }
    })
    .catch((error) => {
     
    });
  };
};
export const searchProductForm = (data, navigate) => {
  return (dispatch) => {
    APILink.post(`product/search`, data)
      .then((response) => {
        if (response.data.status === "success") {
          dispatch(Listsearch(response.data.results));
          dispatch(toggleSearch())
          toast.success(response.data.mess, {})
        
        } else {
          toast.error(response.data.mess, {})
        }
      })
      .catch((error) => {
        console.error('Lỗi khi gọi API:', error);
      })
     
  }
};
export const createPayment = (dataPayying,navigate,user_id) => {
  return (dispatch) => {
    APILink.post(`payment/add-payment/${user_id}`, dataPayying)
    .then((response) => {
      if (response.data.status === 'success') {
        toast.success(response.data.mess);
        const storedDataPayingString = localStorage.getItem('dataPaying');
        const dataPayying = JSON.parse(storedDataPayingString);
        if(dataPayying){
          localStorage.removeItem('dataPaying');
        }
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        toast.error("Có lỗi xảy ra khi thêm vào cơ sở dữ liệu.");
      }
    })
    .catch((error) => {
      console.error('Error fetching products:', error);
      toast.error("Có lỗi mạng khi gửi yêu cầu.");
    });
    }
  
};
export const updateUserInfro = (data,user_id,setinfroUser,handleClose) => {
   APILink.put(`user/update/${user_id}`,data)
      .then((response) => {
        if (response.data.status === 'success') {
          toast.success(response.data.mess);
          if (setinfroUser && typeof setinfroUser === 'function') {
            setinfroUser(response.data.result);
          }
          if (handleClose && typeof handleClose === 'function') {
            handleClose();
          }
        } else {
          toast.error(response.data.mess);
        }
      })
      .catch((error) => {
        console.error('Error ', error);
      });
};
export const callAPIMyPayment = (user_id,status_id,setlistPayment) => {
  APILink.get(`payment/get-myBill/${user_id}/${status_id}`)
  .then((response) => {
    if (response.data.status === 'success') {
      if (setlistPayment && typeof setlistPayment === 'function') {
        setlistPayment(response.data.results);
      }
    } else {
      toast.error("Có lỗi xảy ra khi lấy danh sách đơn hàng!");
    }
  })
  .catch((error) => {
    console.error('Error fetching my bills:', error);
    toast.error("Có lỗi xảy ra khi lấy danh sách đơn hàng!");
  });
};
export const callAPIStatusPaymentFun = (setListTitelStatus,setactiveListPayment) => {
  APILink.get(`payment/get-status-payment`)
  .then((response) => {
    if (response.data.status === 'success') {
      if (setListTitelStatus && typeof setListTitelStatus === 'function') {
        setListTitelStatus(response.data.results);
      }
      if (setactiveListPayment && typeof setactiveListPayment === 'function') {
        setactiveListPayment(response.data.results[0].id);
      }
    } else {
      toast.error("Có lỗi xảy ra khi lấy danh sách đơn hàng!");
    }
  })
  .catch((error) => {
    console.error('Error fetching my bills:', error);
    toast.error("Có lỗi xảy ra khi lấy danh sách đơn hàng!");
  });
};
export const callDeatilPayment = (payment_id,setpayment_deatil) => {
  APILink.get(`payment/get-deatilBill/${payment_id}`)
  .then((response) => {
    if (response.data.status === 'success') {
      if (setpayment_deatil && typeof setpayment_deatil === 'function') {
        setpayment_deatil(response.data.results);
      }
    } else {
      toast.error("Có lỗi xảy ra khi lấy danh sách đơn hàng!");
    }
  })
  .catch((error) => {
    console.error('Error fetching my bills:', error);
  });
};
export const createResquestCanneBill = (payment_id,user_id,data,setShow,handleClose) => {
  APILink.post(`payment/create-Resquest-Canne-Bill/${user_id}/${payment_id}`,data)
  .then((response) => {
    if (response.data.status === 'success') {
          if (setShow && typeof setShow === 'function'&&handleClose && typeof handleClose === 'function') {
            toast.success(response.data.mess);
            handleClose();
          }
          toast.success(response.data.mess);
    } else {
      toast.success(response.data.mess);
    }
  })
  .catch((error) => {
    console.error('Error fetching my bills:', error);
  });
};
export const getListCmtDeaful = (product_id) => {
  return (dispatch) => {
    APILink.get(`product/get-list-cmt/${product_id}`)
    .then((response) => {
      console.log(response.data)
      if (response.data.status === 'success') {
         dispatch(getListCmt(response.data.results));
      } 
    })
    .catch((error) => {
      console.error('Error fetching my bills:', error);
    });
  }
};
export const getListHeart = (user_id) => {
  return (dispatch) => {
    APILink.get(`product/list-myheart/${user_id}`)
    .then((response) => {
      if (response.data.status === 'success') {
         dispatch(getListHeartApi(response.data.results));
      } 
    })
    .catch((error) => {
      console.error('Error fetching my bills:', error);
    });
  }
};
export const postAPICmt = (product_id,data,setValueInput) => {
  return (dispatch) => {
    APILink.post(`product/add-cmt/${product_id}`,data)
    .then((response) => {
      console.log(response.data)
      if (response.data.status === 'success') {
        dispatch(appenListCmt(response.data.results));
        setValueInput("");
        dispatch(updateRepLyId(null));
        dispatch(updateReqText(null));
        document.querySelector('.btn-cancel').classList.remove('active');
        document.querySelectorAll('.cmt-item.active').forEach((element) => {
            element.classList.remove('active');
        });
      } 
    })
    .catch((error) => {
      console.error('Error fetching my bills:', error);
    });
  }

};
export const addMyHeart = (user_id,data) => {
  return (dispatch) => {
    APILink.post(`product/add-myheart/${user_id}`,data)
    .then((response) => {
      console.log(response.data)
      if (response.data.status === 'success') {
        toast.success(response.data.mess);
        dispatch(getListHeart(user_id))
      } 
    })
    .catch((error) => {
      console.error('Error fetching my bills:', error);
    });
  }
};
export const deleteMyHeart = (user_id,data) => {
  return (dispatch) => {
    APILink.post(`product/delete-myheart/${user_id}`,data)
    .then((response) => {
      console.log(response.data)
      if (response.data.status === 'success') {
        toast.success(response.data.mess);
        dispatch(getListHeart(user_id))
      } 
    })
    .catch((error) => {
      console.error('Error fetching my bills:', error);
    });
  }
};
export const geListProductAllPage = (page) => {
  return (dispatch) => {
    APILink.get(`product/get-listAll?page=${page}`)
    .then((response) => {
      if (response.data.status === 'success') {
        dispatch(getListProductAll(response.data.results));
        dispatch(updateTotal(response.data.pagination.totalItems));
        dispatch(getListPage(response.data.pagination.totalItems));
        dispatch(updateLimit(response.data.pagination.itemsPerPage));
      } 
    })
    .catch((error) => {
      console.error('Error fetching my bills:', error);
    });
  }
};