import React from "react";
import styled from "styled-components";

const ChatContainer = () => {
  return <Chat>Chat here</Chat>;
};

const Chat = styled.div`
  grid-area: 3 / 2 / 7 / 3;
  width: 100%;
  height: 100%;
  display: flex;
  border: solid;
`;

export default ChatContainer;
