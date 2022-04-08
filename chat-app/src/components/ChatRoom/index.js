import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

const ChatRoom = () => {
  const [roomId, setRoomId] = useState(null);
  const [sender, setSender] = useState(null);
  const [message, setMessage] = useState(null);
  const client = useRef(null);

  const location = useLocation();

  useEffect(() => {
    setRoomId(location.state?.roomId);
    console.log(roomId);
    connect();

    return () => {
      disconnect();
    };
  }, [location.state?.roomId, roomId]);

  function connect() {
    client.current = new StompJs.Client({
      // brokerURL: "ws://localhost:8080/ws-stomp", // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS("/ws-stomp"), // proxy를 통한 접속
      connectHeaders: {},
      debug: console.log,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: subscribe,
      onStompError: console.error,
    });

    client.current.activate();
  }

  function disconnect() {
    client.current.deactivate();
  }

  function subscribe() {
    setMessage([]);
    client.current.subscribe(`/sub/chat/room/${roomId}`, ({ body }) => {
      console.log("message : " + body);
      setMessage((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
    });
  }

  function publish() {
    client.current.publish(`/pub/chat/room/${roomId}`, {
      sender: "test-sender",
      message: "test-message",
    });
  }

  if (!roomId || !message) {
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
