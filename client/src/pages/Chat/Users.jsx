import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useMessageState } from "../../context/messages";
import { useMessageDispatch } from "../../context/messages";

const GET_USERS = gql`
  query getUsers {
    getUsers {
      username
      email
      createdAt
      image
      latestMessage {
        uuid
        from
        to
        content
        createdAt
      }
    }
  }
`;

export default function Users({}) {
  const dispatch = useMessageDispatch();
  const { users } = useMessageState();

  const { loading } = useQuery(GET_USERS, {
    onCompleted: (data) =>
      dispatch({ type: "SET_USERS", payload: data.getUsers }),
    onError: (err) => console.log(err),
  });

  let text;

  if (!users || loading) {
    text = <p>Loading...</p>;
  } else if (users.length === 0) {
    text = <p>No users have joined yet</p>;
  } else if (users.length > 0) {
    text = users.map((user) => (
      <div
        className="chat-module"
        key={user.username}
        onClick={() =>
          dispatch({ type: "SET_SELECTED_USER", payload: user.username })
        }
      >
        <img className="ui avatar tiny image" src={user.image} alt="" />
        <div>
          <p className="username">{user.username}</p>
          <p>
            {user.latestMessage
              ? user.latestMessage.content
              : "You are now connected!"}
          </p>
        </div>
      </div>
    ));
  }
  return (
    <div>
      <div className="chat-heads">{text}</div>
    </div>
  );
}
