import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './page/home/home';
import Feedback from './page/Feedback/Feedback';
import Acction from './page/acccount/account';
import Contact from './page/contact/Contact';
import Modal from './components/modalProduct';
import Buy from './page/Buy/Buy';
import Blog from './page/blog/blog';
import Theloai from './page/theloai/theloai';
import Deatil from './page/deatil/deatil';
import MyCart from './page/mycart/mycart';
import Payying from './page/payying/payying';
import Search from './page/search/search';
import Result from './page/result/result';
import MyAccount from './page/acccount/myAccount';
import DeatilPayment from './page/deatilPayment/deatilPayment';
import ListAllProduct from './page/listAllProduct/listProduct';
function main() {
  return (
    <main>
      <Modal/>
     <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/feedback" element={<Feedback />} />
             <Route path="/buy" element={<Buy />} />
             <Route path="/acction" element={<Acction />} />
             <Route path="/contact" element={<Contact />} />
             <Route path="/blog" element={<Blog />} />
             <Route path="/theloai/:theloai_id" element={<Theloai />} />
             <Route path="/deatil/:product_id" element={<Deatil />} />
             <Route path="/cart" element={<MyCart />} />
             <Route path="/payying" element={<Payying />} />
             <Route path="/search" element={<Search />} />
             <Route path="/result" element={<Result />} />
             <Route path="/myAccount" element={<MyAccount />} />
             <Route path="/list-ProductAll" element={<ListAllProduct />} />
             <Route path="/deatilPayment/:payment_id" element={<DeatilPayment />} />
     </Routes>
    </main>
  )
}

export default main
