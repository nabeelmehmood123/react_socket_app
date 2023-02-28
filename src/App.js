import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect(process.env.REACT_APP_BACKEND_URL);

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chat message', message);
    setMessage('');
  };

  return (
      <div>
        <ul>
          {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
          ))}
        </ul>
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
          />
          <button>Send</button>
        </form>
      </div>
  );
}

export default App;
