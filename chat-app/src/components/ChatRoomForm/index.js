import React, { useState, useEffect } from "react";

const ChatRoomForm = () => {
  const [roomName, setRoomName] = useState("");

  return (
    <div className="chat-room-wrapper">
      <div className="chat-room-header">
        <h1>Create Room</h1>
      </div>
    </div>
  );
};

export default ChatRoomForm;
