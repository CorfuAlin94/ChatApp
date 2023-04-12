import React, { useEffect, useState } from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useMessageState } from "../../context/messages";
import { useMessageDispatch } from "../../context/messages";

const GET_MESSAGES = gql`
  query getMessages($from: String!) {
    getMessages(from: $from) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation createMessage($to: String!, $content: String!) {
    createMessage(to: $to, content: $content) {
      uuid
      from
      to
      content
      createdAt
    }
  }
`;

export default function Messages({}) {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();
  const [content, setContent] = useState("");

  const selectedUser = users?.find((user) => user.selected === true);
  const messages = selectedUser?.messages;

  const [getMessages, { loading: messagesLoading, data: messagesData }] =
    useLazyQuery(GET_MESSAGES);

  const [createMessage] = useMutation(SEND_MESSAGE, {
    onCompleted: (data) =>
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          username: selectedUser.username,
          message: data.createMessage,
        },
      }),
    onError: (err) => console.log(err),
  });

  useEffect(() => {
    if (selectedUser && !selectedUser.messages?.username) {
      getMessages({ variables: { from: selectedUser.username } });
    }
  }, [selectedUser]);

  if (messagesData) console.log(messagesData.getMessages);

  useEffect(() => {
    if (messagesData) {
      dispatch({
        type: "SET_USER_MESSAGES",
        payload: {
          username: selectedUser.username,
          messages: messagesData.getMessages,
        },
      });
    }
  }, [messagesData]);

  const submitMessage = (e) => {
    e.preventDefault();

    setContent("");
    if (content === "" || !selectedUser) return;

    //mutation for sending the msg!
    createMessage({ variables: { to: selectedUser.username, content } });
  };

  let selectedChat;

  if (!messages && !messagesLoading) {
    selectedChat = <p>Select a friend</p>;
  } else if (messagesLoading) {
    selectedChat = <p>Loading...</p>;
  } else if (messages.length > 0) {
    selectedChat = messages.map((message) => (
      <div key={message.uuid}>
        <p>
          {message.from}: <span>{message.content}</span>
        </p>
      </div>
    ));
  } else if (messages.length === 0) {
    selectedChat = <p>You are now connected! Send your first message!</p>;
  }

  return (
    <div>
      <div className="selectedChat">{selectedChat}</div>
      <form className="messages-form " onSubmit={submitMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="messages-input"
        />
      </form>
    </div>
  );
}
