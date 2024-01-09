// in ActionProvider.jsx
import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleBuy= () => {
    const botMessage = createChatBotMessage('Bạn muốn mua sản phẩm nào ạ ? Bạn có thể để lại số điện thoại để nhân viên bên mình tư vấn không ạ?');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const req = () => {
    const botMessage = createChatBotMessage('Xin chào chúng tôi có thể giúp gì cho bạn');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
    return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleBuy,
            req,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;