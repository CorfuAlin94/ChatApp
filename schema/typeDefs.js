const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    username: String!
    email: String!
    createdAt: String!
    token: String
    image: String!
    latestMessage: Messages
  }

  type Query {
    getUsers: [User]!
    login(username: String!, password: String!): User!
    getMessages(from: String!): [Messages]!
  }

  type Messages {
    uuid: String!
    content: String!
    from: String!
    to: String!
    createdAt: String!
  }

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      image: String!
    ): User!
    createMessage(to: String!, content: String!): Messages!
  }
`;
