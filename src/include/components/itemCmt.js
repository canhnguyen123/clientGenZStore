import React from 'react';
import { updateRepLyId, updateReqText } from '../../redux/action/productAcction';
import { useDispatch } from 'react-redux';

function ItemCmt(props) {
    const dispatch = useDispatch();
    const name = props.data.user_id !== null ? props.data.user_fullname : 'Quản trị viên';
    const repLyId = (e, item, name) => {
        dispatch(updateRepLyId(item));
        dispatch(updateReqText("Trả lời : " + name))
        document.querySelector('.btn-cancel').classList.add('active');
        document.querySelectorAll('.cmt-item.active').forEach((element) => {
            element.classList.remove('active');
        });
        const parentElement = e.currentTarget.closest('.cmt-item');
        if (parentElement) {
            parentElement.classList.add('active');
        }
    };
    return (
        <div>
            <div className={`cmt-item ${props.data.comment_resMessId && props.data.comment_resMessId !== null ? "cmt-item-active" : null}`} >
                <div className="cmt-item-header">
                    <div className="cmt-item-img">
                        <img
                            src={
                                props.data.user_id !== null
                                    ? props.data.img !== null
                                        ? props.data.img
                                        : 'https://firebasestorage.googleapis.com/v0/b/newdoan-19717.appspot.com/o/666201.png?alt=media&token=109034e3-633f-4924-aeae-93e14e5b5a64'
                                    : 'https://firebasestorage.googleapis.com/v0/b/doan-59ab4.appspot.com/o/admin-icon-strategy-collection-thin-600nw-2307398667.webp?alt=media&token=effed445-5211-4a87-a056-3fc6d5e06ad3'
                            }
                            alt=""
                        />
                    </div>
                    <div className="cmt-item-infro-user flex_start">
                        <p>{name}</p>
                    </div>
                </div>
                <div className="cmt-item-ifro">
                    <p>{props.data.comment_context}</p>
                </div>
                <div className="reqly-link flex_start">
                    {props.data.comment_resMessId && props.data.comment_resMessId !== null ? (
                        null
                    ) : (
                        <p className="reqly-link-text feedback-cmt mg-r-50" onClick={(e) => repLyId(e, props.data.id, name)}>
                            Phản hồi
                        </p>
                    )}

                    <p className="reqly-link-text count-cmt">Có {props.data.countCmtChild} comment phản hồi</p>
                </div>

            </div>
        </div>
    );
}

export default ItemCmt;
