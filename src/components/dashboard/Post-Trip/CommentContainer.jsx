import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import api from "../../../functions/api";
import { UserContext } from "../../../contexts/user";
import { useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const CommentContainer = () => {
  const user = useContext(UserContext);
  const { tripId } = useParams();

  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");

  useEffect(() => {
    api
      .get(`/dashboard/${tripId}`)
      .then((response) => {
        console.log(response.data);
        setComments(response.data[2]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, tripId);

  return (
    <CommentGrid>
      <CommentWrapper>
        <CommentCont id="comments">
          {comments.map((comment, index) => (
            <Comment key={index}>
              <Pfp src={comment.picture} />
              <CommentBody>
                <CommentHead>
                  <strong>{comment.nickname}</strong>
                  <ReactTimeAgo
                    date={comment.time_stamp * 1000}
                    locale="en-US"
                    style={timeStyle}
                  />
                </CommentHead>
                <div>{comment.body}</div>
              </CommentBody>
            </Comment>
          ))}
        </CommentCont>
      </CommentWrapper>
      <AddCommentWrapper>
        <Input
          placeholder="Add Comment Here"
          onChange={(e) => setBody(e.target.value)}
        ></Input>
        <Button
          onClick={() => {
            if (body.length) {
              api
                .post(`/dashboard/${tripId}/comment`, {
                  body,
                  timeStamp: Date.now(),
                })
                .then(() => {
                  const commentList = document.getElementById("comments");
                  commentList.scrollTo(0, commentList.scrollHeight);
                  scrollBottom.current = messageList.scrollTop;
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }}
        >
          Post
        </Button>
      </AddCommentWrapper>
    </CommentGrid>
  );
};

const CommentGrid = styled.div`
  grid-area: 3 / 2 / 10 / 3;
  width: 100%;
  height: 100%;
  max-height: 100%;
  border: solid;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 1.5em;
  padding: 1em;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  width: 20%;
  height: 100%;
  color: ${(props) => props.theme.buttonColor};
  background-color: ${(props) => props.theme.button};
  cursor: pointer;
`;

const Input = styled.input`
  width: 80%;
  height: 100%;
`;

const AddCommentWrapper = styled.div`
  width: 100%;
  height: 5%;
  margin-top: 5px;
`;

const CommentWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: auto;
  overflow: auto;
  display: flex;
  /* align-items: end; */
`;
const CommentCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  max-height: 10px;
`;

const Comment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CommentBody = styled(Comment)`
  flex-direction: column;
  align-items: flex-start;
`;

const CommentHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.25em;
`;

const Pfp = styled.img`
  height: 3em;
  width: 3em;
  object-fit: cover;
  border-radius: 1em;
  margin-right: 0.5em;
`;

const timeStyle = {
  fontSize: ".75em",
  fontStyle: "italic",
};

export default CommentContainer;
