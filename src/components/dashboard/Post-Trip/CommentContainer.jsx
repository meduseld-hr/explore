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
        setComments(response.data[2]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CommentGrid>
      <MessageWrapper>
        <MessageCont id="messages">
          {comments.map((message, index) => (
            <Message key={index}>
              <Pfp src={message.picture} />
              <MessageBody>
                <MessageHead>
                  <strong>{message.nickname}</strong>
                  <ReactTimeAgo
                    date={message.time_stamp * 1000}
                    locale="en-US"
                    style={timeStyle}
                  />
                </MessageHead>
                <div>{message.body}</div>
              </MessageBody>
            </Message>
          ))}
        </MessageCont>
      </MessageWrapper>
      <AddCommentWrapper>
        <Input placeholder="Add Comment Here"></Input>
        <Button
          onClick={() => {
            api
              .post(`/dashboard/${tripId}/comment`, {
                body,
                timeStamp: Date.now(),
              })
              .catch((err) => {
                console.log(err);
              });
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

const MessageWrapper = styled.div`
  flex: 1;
  width: 100%;
  height: auto;
  overflow: auto;
  display: flex;
  align-items: end;
`;
const MessageCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Message = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const MessageBody = styled(Message)`
  flex-direction: column;
  align-items: flex-start;
`;

const MessageHead = styled.div`
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
