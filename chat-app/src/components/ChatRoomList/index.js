import React, { useState, useEffect } from "react";
import http from "../../http";

const ChatRoomList = () => {
  const [chatRoomList, setChatRoomList] = useState(null);

  useEffect(() => {
    http.get('/chat/rooms').then(({data: _chatRoomList}) => {
      setChatRoomList(_chatRoomList);
      console.log(_chatRoomList);
    })
  }, [])

  return <div className="chat-room-wrapper">
    

  </div>;
};

export default ChatRoomList;
