import React from "react";
import styled from "styled-components";
import Chat from "../Chat.jsx";

const ChatContainer = () => {
  return <Chat />
};

const ChatGrid = styled.div`
  grid-area: 3 / 2 / 7 / 3;
  width: 100%;
  height: 100%;
  display: flex;
  border: solid;
`;

export default ChatContainer;
