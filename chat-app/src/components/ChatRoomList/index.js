import React, { useState, useEffect } from "react";
import http from "../../http";
import "../style-chat-room.css";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";

const ChatRoomList = () => {
  const [chatRoomList, setChatRoomList] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [user, setUser] = useState("");

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

  function handleOpenModal(room) {
    setSelectedRoom((_room) => room);
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
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
          <div
            key={room.roomId}
            className="item__data"
            onClick={(e) => handleOpenModal(room)}
          >
            <div className="item__names">{room.name}</div>
            <div className="item__btn_detail"></div>
            <div className="item__bar"></div>
          </div>
        ))}
      </div>
      <ReactModal
        isOpen={showModal}
        contentLabel="onRequestClose Example"
        onRequestClose={handleCloseModal}
        className="Modal"
        overlayClassName="Overlay"
        appElement={document.getElementById("root") || undefined}
      >
        <div className="modal-wrapper">
          <div className="modal-header">
            <h2> {`${selectedRoom?.name} | 대화명 입력`}</h2>
          </div>
          <div className="modal-body">
            <input
              className="modal-name-input"
              type="text"
              placeholder={`대화명을 입력해주세요`}
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <Link to="/room" state={{ room: selectedRoom, user: user }}>
              Enter
            </Link>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default ChatRoomList;
