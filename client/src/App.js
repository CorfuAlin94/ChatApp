import React from "react";
import ApolloProvider from "./Apollo/ApolloProvider";
import { AuthProvider } from "./context/auth";
import { MessageProvider } from "./context/messages";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Chat from "./pages/Chat/Chat";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <div className="ui aligned center container">
        <AuthProvider>
          <MessageProvider>
            <ApolloProvider>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chat" element={<Chat />} />
              </Routes>
            </ApolloProvider>
          </MessageProvider>
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
