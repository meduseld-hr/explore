import React from "react";
import styled from "styled-components";

const CommentContainer = () => {
  return <CommentGrid>Comments here</CommentGrid>;
};

const CommentGrid = styled.div`
  grid-area: 3 / 2 / 10 / 3;
  width: 100%;
  height: 100%;
  max-height: 100%;
  display: flex;
  border: solid;
`;

export default CommentContainer;
