// in config.js
import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'GENZ Store';

const config = {
  initialMessages: [createChatBotMessage(`Xin chào bạn đây là cửa hàng ${botName}`)],
  botName: botName,
  customComponents: {
    // Tùy chỉnh giao diện của tiêu đề
    header: (props) => (
      <div className="react-chatbot-kit-chat-header">
        <div className="title">Chat với hệ thống</div>
      </div>
    
  )},
  customStyles: {
    botMessageBox: {
      backgroundColor: '#ff4136',
    },
    // chatButton: {
    //   backgroundColor: '#5ccc9d',
    // },
  },
};

export default config;