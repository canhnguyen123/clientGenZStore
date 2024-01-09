import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./css/app.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './include/header';
import Main from './include/main';
import Footer from './include/footer';
import Chatboot from './include/chatboot';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
function App() {
  return (
    <div className='wapr'>
        <ToastContainer />
        <Header/>
        <Main/>
        <Chatboot/>
        <Footer/>
    </div>
  )
}

export default App
