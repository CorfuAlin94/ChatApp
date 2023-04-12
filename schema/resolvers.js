const { User, Message } = require("../models/index.js");
const bcrypt = require("bcrypt");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.json");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    //  Get all users

    getUsers: async (_, __, { user }) => {
      try {
        // Makes the Auth based on the unique token

        if (!user) throw new AuthenticationError("Unaunthenticated 😫");

        //Finds all users and removes the one with the matching bearer token.
        //Op is from the sequelizer docs under the Querying - Basics

        let users = await User.findAll({
          where: { username: { [Op.ne]: user.username } },
        });

        const allUserMessages = await Message.findAll({
          where: {
            [Op.or]: [{ from: user.username }, { to: user.username }],
          },
          order: [["createdAt", "DESC"]],
        });

        users = users.map((otherUser) => {
          const latestMessage = allUserMessages.find(
            (message) =>
              message.from === otherUser.username ||
              message.to === otherUser.username
          );
          otherUser.latestMessage = latestMessage;
          return otherUser;
        });

        return users;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    // Login users and constrains

    login: async (_, args) => {
      let { username, password } = args;
      let errors = {};
      try {
        if (username.trim() === "") errors.username = "Empty username";
        if (password === "") errors.password = "Empty password";

        if (Object.keys(errors).length > 0) {
          throw new UserInputError("Bad input 😥", { errors });
        }

        const user = await User.findOne({
          where: { username: username },
        });

        if (!user) {
          errors.username = "User not found 🧐";
          throw new UserInputError("User not found 🧐", { errors });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if (!correctPassword) {
          errors.password = "Password is incorrect 😑";
          throw new UserInputError("Password is incorrect 😑", { errors });
        }

        // JWt Token for auth

        const token = jwt.sign(
          {
            username,
          },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        // Spread the user so you can change the created form of 043222352 to date xxxx-xx-xx:xx:xx:xx
        return {
          ...user.toJSON(),
          createdAt: user.createdAt.toISOString(),
          token,
        };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    // Get users and constrains

    getMessages: async (_, { from }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unaunthenticated 😫");
        const otherUser = await User.findOne({
          where: { username: from },
        });

        if (!otherUser) throw new UserInputError("User not found");

        const usernames = [user.username, otherUser.username];

        const allUserMessages = await Message.findAll({
          where: {
            from: { [Op.in]: usernames },
            to: { [Op.in]: usernames },
          },
          order: [["createdAt", "DESC"]],
        });
        return allUserMessages;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },

  //any args that are passed throw the typeDefs Mutation type
  Mutation: {
    // mutation register Resolver

    register: async (_, args) => {
      let { username, email, password, image } = args;
      let errors = {};

      // To use or not to use bcrypt? 🤔🤔
      password = await bcrypt.hash(password, 10);

      try {
        // Validate input data
        if (username.trim() === " ")
          errors.username = "User name must not be empty";
        if (email.trim() === " ") errors.email = "Email must not be empty";
        if (password.trim() === " ")
          errors.password = "Password must not be empty";
        if (image.trim() === " ") errors.image = "Image must not be empty";

        // Check if username / email exists && constrains

        const userByUserName = await User.findOne({
          where: { username: username },
        });
        const userByEmail = await User.findOne({
          where: { email: email },
        });

        const userByImage = await User.findOne({
          where: { image: image },
        });

        if (userByUserName) errors.username = "Username is taken";
        if (userByEmail) errors.email = "Email is taken";
        if (userByImage) errors.image = "Image is taken";

        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        // Create user

        const user = await User.create({
          username: username,
          email: email,
          password: password,
          image: image,
        });

        // Return user to client

        return user;
      } catch (err) {
        console.log(err);
        throw new UserInputError("Bad input 😥", { errors: err });
      }
    },

    // mutation create Message Resolver

    createMessage: async (parent, { to, content }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unaunthenticated 😫");

        const recipient = await User.findOne({ where: { username: to } });

        if (!recipient) {
          throw new UserInputError("User not found!");
        } else if (recipient.username === user.username) {
          throw new UserInputError("You can't do that");
        }
        if (content.trim() === "") {
          throw new UserInputError("Empty message...");
        }

        const message = await Message.create({
          from: user.username,
          to,
          content,
        });

        return message;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },

  // The CreatedAt format To ISO String format

  Messages: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
};
