import React, { useState, useEffect } from "react";

const ChatRoom = () => {
  const [message, setMessage] = useState([]);

  return (
    <div className="chat-room-wrapper">
      <div className="chat-room-header">
        <h1>Chat Room List</h1>
      </div>

      <div className="chat-room-list">
        {message.map((msg, index) => (
          <div key={index}>
            <div className="item__data">
              <div className="item__names">{msg.name}</div>
              <div className="item__btn_detail"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
