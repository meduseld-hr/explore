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
  const scrollBottom = useRef(0);

  useEffect(() => {
    socket.current = io('http://localhost:3000', {
      withCredentials: false
    });
    socket.current.on('chat message', (message) => {
      setMessages((messages) => (
        [...messages, message]
      ));
      const messageList = document.getElementById('messages');
      if (scrollBottom.current === messageList.scrollTop) {
        messageList.scrollTo(0, messageList.scrollHeight);
        scrollBottom.current = messageList.scrollTop;
      }
    });
    api.get(`/dashboard/${tripId}`)
      .then((response) => {
        setMessages(response.data[1]);
        const messageList = document.getElementById('messages');
        messageList.scrollTo(0, messageList.scrollHeight);
        scrollBottom.current = messageList.scrollTop;
      })
      .catch((err) => {
        console.log(err);
      })
    return () => {
      socket.current.disconnect();
    }
  }, []);

  useEffect(() => {
    const messageList = document.getElementById('messages');
    if (scrollBottom.current === messageList.scrollTop) {
      messageList.scrollTo(0, messageList.scrollHeight);
      scrollBottom.current = messageList.scrollTop;
    }
  }, [messages])

  return (
    <ChatCont>
      <button>Add Explorers</button>
      <MessageWrapper id='messages'>
        <MessageCont >
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
      </MessageWrapper>
      <Form onSubmit={(e) => {
        e.preventDefault();
        if (body.length) {
          api.post(`/dashboard/${tripId}/chat`, {body, timeStamp: Date.now()})
            .then(() => {
              socket.current.emit('chat message', {
                body,
                time_stamp: Date.now() / 1000,
                nickname: user.nickname,
                picture: user.picture
              });
              setBody('');
              const messageList = document.getElementById('messages');
              messageList.scrollTo(0, messageList.scrollHeight);
              scrollBottom.current = messageList.scrollTop;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }}>
        <div>
          <Input
            type='text'
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              }
            } />
          <input type='submit' />
        </div>
      </Form>
    </ChatCont>
  )

};

const ChatCont = styled.div`
  grid-area: 2 / 1 / 3 / 3;
  padding: 1.5em;
  border-radius: 1.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.border};
`
const MessageWrapper = styled.div`
  flex: 1;
  overflow: auto;
`
const MessageCont = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  max-height: 10px;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
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
  margin-right: 0.5em;
`

const timeStyle = {
  fontSize: ".75em",
  fontStyle: "italic"
}

const Form = styled.form`
  width: 100%;
`

const Input = styled.input`
  display: inline-block;
  width: 80%
`

export default Chat;