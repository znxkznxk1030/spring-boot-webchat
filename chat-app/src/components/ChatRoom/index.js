import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Stomp from "stompjs";
import * as SockJS from "sockjs-client";

const ChatRoom = () => {
  const [sender, setSender] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const location = useLocation();

  const room = location.state.room;

  const sock = new SockJS("http://localhost:8080/ws-stomp");
  const client = Stomp.over(sock);

  useEffect(() => {
    client.connect({}, () => {
      client.subscribe(`/sub/chat/room/${room.roomId}`, (res) => {
        console.log(res);
        console.log(messageList);
        const msg = JSON.parse(res.body);

        if (messageList == null) {
          setMessageList([msg]);
        } else {
          console.log([...messageList, msg]);
          setMessageList((msgList) => [...msgList, msg]);
        }
      });

      client.send(
        `/pub/chat/message`,
        {},
        JSON.stringify({
          type: "JOIN",
          roomId: room.roomId,
          sender: "test-001",
          message: "test message",
        })
      );
    });

    return () => client.disconnect();
  }, []);


  function handleSubmit(event) {
    event.preventDefault();
    client.send(
      `/pub/chat/message`,
      {},
      JSON.stringify({
        type: "TALK",
        roomId: room.roomId,
        sender: "test-001",
        message,
      })
    );

    setMessage("");
  }

  if (!messageList) {
    return (
      <div className="chat-room-wrapper">
        <div className="chat-room-header">
          <h1>Chat Room List</h1>
        </div>

        <div className="chat-room-list">
          <h3>Loading...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-room-wrapper">
      <div className="chat-room-header">
        <h1>{`채팅방: ${room.name}`}</h1>
      </div>

      <div className="chat-room-list">
        {messageList.map((msg, index) => (
          <div key={index}>
            <div className="item__data">
              <div className="item__names">{msg.message}</div>
              <div className="item__btn_detail"></div>
            </div>
          </div>
        ))}
      </div>

      <form className="chat-room_form" onSubmit={handleSubmit}>
        <input
          className="title_input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value="+" className="submit_input"></input>
      </form>
    </div>
  );
};

export default ChatRoom;
