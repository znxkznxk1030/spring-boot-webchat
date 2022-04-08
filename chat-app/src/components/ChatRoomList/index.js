import React, { useState, useEffect } from "react";
import http from "../../http";
import "../style-chat-room.css";
import { Link } from "react-router-dom";

const ChatRoomList = () => {
  const [chatRoomList, setChatRoomList] = useState([]);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    loadChatRoomList();
  }, []);

  function loadChatRoomList() {
    http.get("/chat/rooms").then(({ data: _chatRoomList }) => {
      setChatRoomList(_chatRoomList);
      console.log(_chatRoomList);
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (roomName.trim().length < 4) {
      alert(
        " Too short for room name ! ( need more than 4 characters except for blank spaces)"
      );
      return;
    }
    await createChatRoom();
    loadChatRoomList();
    setRoomName("");
  }

  function createChatRoom() {
    const payload = {
      name: roomName,
    };

    return http.post("/chat/room", null, { params: payload });
  }

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
        {chatRoomList.map((room, index) => (
          <Link key={index} to="/room" state={{ roomId: room.roomId }}>
            <div className="item__data">
              <div className="item__names">{room.name}</div>
              <div className="item__btn_detail"></div>
              <div className="item__bar"></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatRoomList;
