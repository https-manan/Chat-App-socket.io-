import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000'); // connect once

function App() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setChat((prev) => [...prev, msg]);
    });
    return () => socket.off("message");
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white px-4 py-2 text-lg font-semibold">
          Chat App
        </div>

        {/* Chat messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-2 bg-gray-50">
          {chat.map((msg, i) => (
            <div
              key={i}
              className="p-2 rounded-lg bg-blue-100 text-gray-800 w-fit max-w-xs"
            >
              {msg}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex border-t">
          <input
            className="flex-1 px-3 py-2 text-gray-800 focus:outline-none"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-4 bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
