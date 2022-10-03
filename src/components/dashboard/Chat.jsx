import React, {useState, useEffect, useRef, useContext} from 'react';
import styled from 'styled-components';
import {UserContext} from '../../contexts/user';
import api from '../../functions/api';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';
import {useParams} from "react-router-dom";

TimeAgo.addDefaultLocale(en);

const Chat = () => {

  const user = useContext(UserContext);
  const {tripId} = useParams();

  const [body, setBody] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io('http://localhost:3000', {
      withCredentials: false
    });
    socket.current.on('chat message', (message) => {
      setMessages((messages) => (
        [...messages, message]
      ));
    });
    api.get(`/dashboard/${tripId}`)
      .then((response) => {
        setMessages(response.data[1]);
      })
      .catch((err) => {
        console.log(err);
      })
    return () => {
      socket.current.disconnect();
    }
  }, []);

  return (
    <div>
      <MessageCont>
        {messages.map((message, index) => (
          <Message key={index}>
            <Pfp src={message.picture} />
            <MessageBody>
              <MessageHead>
                <strong>{message.nickname}</strong>
                <ReactTimeAgo
                  date={message.time_stamp * 1000}
                  locale='en-US'
                  style={timeStyle}
                />
              </MessageHead>
              <div>{message.body}</div>
            </MessageBody>
          </Message>
        ))}
      </MessageCont>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (body.length) {
          api.post(`/dashboard/${tripId}`, {body, timeStamp: Date.now()})
            .then(() => {
              socket.current.emit('chat message', {
                body,
                time_stamp: Date.now() / 1000,
                nickname: user.nickname,
                picture: user.picture
              });
              setBody('');
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }}>
        <div>
          <input type='text' value={body} onChange={(e) => {
            setBody(e.target.value);
          }} />
          <input type='submit' />
        </div>
      </form>
    </div>
  )
};

const MessageCont = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 1em;
`

const Message = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const MessageBody = styled(Message)`
  flex-direction: column;
  align-items: flex-start;
`

const MessageHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: .25em;
`

const Pfp = styled.img`
  height: 3em;
  border-radius: 1.5em;
  padding-right: 0.5em;
`

const timeStyle = {
  fontSize: ".75em",
  fontStyle: "italic"
}

export default Chat;