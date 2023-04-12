const { ApolloServer } = require("apollo-server");
const { sequelize } = require("./models");
const resolvers = require("./schema/resolvers.js");
const typeDefs = require("./schema/typeDefs.js");
const contextMiddleware = require("./util/contextMiddleware.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
});

server.listen().then(({ url }) => {
  console.log(`🚀🚀🚀  Server ready at ${url}`);

  sequelize
    .authenticate()
    .then(() => console.log("Database is connected! 🤩🤩🤩"))
    .catch((err) => console.log(err));
});
