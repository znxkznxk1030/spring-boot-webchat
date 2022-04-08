import React, { useState, useEffect } from "react";
import http from "../../http";
import "../style-chat-room.css";

const ChatRoomList = () => {
  const [chatRoomList, setChatRoomList] = useState([]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    http.get("/chat/rooms").then(({ data: _chatRoomList }) => {
      setChatRoomList(_chatRoomList);
      console.log(_chatRoomList);
    });
  }, []);

  function handleSubmit() {}

  return (
    <div className="chat-room-wrapper">
      <div className="chat-room-header">
        <h1>Chat Room List</h1>
      </div>

      
      <form className="chat-room_form" onSubmit={handleSubmit}>
        <input
          className="title_input"
          type="text"
          placeholder={`개설할 방 이름`}
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <input type="submit" value="+" className="submit_input"></input>
      </form>

      <div className="chat-room-list">
        {chatRoomList.map((item, index) => (
          <div key={index}>
            <div className="item__data">
              <div className="item__names">{item.name}</div>
              <div className="item__btn_detail"></div>
              <div className="item__bar"></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ChatRoomList;
