import logo from './logo.svg';
import './App.css';

import { Route, Routes, Link } from "react-router-dom";
import ChatRoomList from './components/ChatRoomList';
import ChatRoom from './components/ChatRoom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="App-body">
        <Routes>
          <Route path="/" element={<ChatRoomList />} />
          <Route path="/room" element={<ChatRoom />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
