import React, { useState } from "react";
import Users from "./Users";
import Messages from "./Messages";

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="chat">
      <div className="messages--form">
        <Messages setSelectedUser={selectedUser} />
      </div>
      <div>
        <Users setSelectedUser={setSelectedUser} />
      </div>
    </div>
  );
}

export default Chat;
