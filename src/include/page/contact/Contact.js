function FormExample() {
  return (
    <div className='pg-85-t flex_center'>
      <div className='container-main row'>
        <div className='col-xl-6 col-sm-12'>
          <div className='contant-box flex_center'>
            <div className='contant-icon flex_center'>
              <i class="fa-solid fa-location-dot"></i>
            </div>
            <div className='flex_start'><p>Địa chỉ: cầu Báng, thôn Đồng Thanh ,Xã Tân Bình,TP Thái Bình,Tỉnh Thái Bình</p></div>
          </div>
          <div className='contant-box'>
            <div className='contant-icon flex_center'>
              <i class="fa-solid fa-phone"></i>
            </div>
            <div className='flex_start'>
              <p>Số điện thoại :0334206603</p>

            </div>
          </div>
          <div className='contant-box'>
            <div className='contant-icon flex_center'>
              <i class="fa-solid fa-envelope"></i>
            </div>
            <div className='flex_start'>
              <p>Email :xuancanh0802@gmail.com</p>

            </div>
          </div>
          <div className='contant-box'>
            <div className='contant-icon flex_center'>
            <i class="fa-brands fa-facebook"></i>
            </div>
            <div className='flex_start'>
              <p>Facebook : <a href='https://www.facebook.com/profile.php?id=100011316633029'>Cảnh Xuân Nguyễn</a> </p>

            </div>
          </div>
        </div>
        <div className='col-xl-6 col-sm-12'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1699341847736!5m2!1svi!2s"
            width="600"
            height="450"
            style={{
              border: '0',
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>


      </div>

    </div>

  );
}

export default FormExample;