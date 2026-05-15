import { useState } from 'react';

const Chat = () => {

  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = message;

    setChat(prev => [
      ...prev,
      { user: 'You', text: userMessage }
    ]);

    setMessage('');

    try {
      const response = await fetch(
        'http://localhost:3000/api/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      const data = await response.json();

      setChat(prev => [
        ...prev,
        {
          user: 'ChatGPT',
          text: data.reply,
        }
      ]);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      {chat.map((msg, index) => (
        <p key={index}>
          <strong>{msg.user}:</strong> {msg.text}
        </p>
      ))}

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />

      <button onClick={sendMessage}>
        Send
      </button>

    </div>
  );
};

export default Chat;