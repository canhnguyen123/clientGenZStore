import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Chatbot from 'react-chatbot-kit';
import config from '../config/configChatBoot';
import MessageParser from '../chatboot/mess/MessageParser';
import ActionProvider from '../chatboot/acction/ActionProvider';

const Chatboot = () => {
  const [showBot, toggleBot] = useState(false);

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages;
  };

  return (
     <Draggable>
    <div className='chat-boot-content flex_center'>
      <div className='chat-main flex_center'>
        {showBot && (
          <Draggable>
            <div className='chat-boot-box'>
              <Chatbot
                config={config}
                actionProvider={ActionProvider}
                messageHistory={loadMessages()}
                messageParser={MessageParser}
                saveMessages={saveMessages}
                placeholderText='Nhập câu hỏi của bạn'
              />
            </div>
          </Draggable>
        )}
       
          <button className='btn-chatboot flex_center' onClick={() => toggleBot((prev) => !prev)}>
            <i className="fa-brands fa-facebook-messenger"></i>
          </button>
       
      </div>
    </div>
    </Draggable>
  );
};

export default Chatboot;
