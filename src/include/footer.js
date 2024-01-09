import React, { useState, useEffect } from 'react';

function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className='flex_center'>
      {isVisible && (
        <div className='load-header-page flex_center' onClick={handleScrollToTop}>
          <i className='fa-solid fa-arrow-up'></i>
        </div>
      )}
      <p>Đây là sản phẩm test không phải trang bán hàng thương mại</p>
    </footer>
  );
}

export default Footer;
