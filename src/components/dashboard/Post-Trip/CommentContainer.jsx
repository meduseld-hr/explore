import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import api from '../../../functions/api';
import {UserContext} from '../../../contexts/user';
import {useParams} from "react-router-dom";

const CommentContainer = () => {

  const user = useContext(UserContext);
  const {tripId} = useParams();

  const [comments, setComments] = useState([]);
  const [body, setBody] = useState('');

  useEffect(() => {
    api.get(`/dashboard/${tripId}`)
      .then((response) => {
        setComments(response.data[2]);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <CommentGrid>
      {comments.map((comment, index) => (
          <div key={index}>
            <img src={comment.picture} />
            <strong>{comment.nickname}</strong>
            <div>{comment.body}</div>
          </div>
        ))}
      <button onClick={() => {
        api.post(`/dashboard/${tripId}/comment`, {body, timeStamp: Date.now()})
          .catch((err) => {
            console.log(err);
          });
      }}></button>

    </CommentGrid>
  );

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
