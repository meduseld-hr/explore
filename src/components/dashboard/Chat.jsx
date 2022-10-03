import React, {useState, useEffect, useRef, useContext} from 'react';
import styled from 'styled-components';
import {UserContext} from '../../contexts/user';
import api from '../../functions/api';

const Chat = () => {

  const user = useContext(UserContext);

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
    api.get('/dashboard/2')
      .then((response) => {
        console.log(response.data);
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
            <Pfp src={user.picture} />
            <MessageBody>
              <strong>{user.given_name}</strong>
              <div>{message.body}</div>
            </MessageBody>
          </Message>
        ))}
      </MessageCont>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (body.length) {
          api.post(`/dashboard/2`, {body: body, timeStamp: Date.now()})
            .then(() => {
              socket.current.emit('chat message', {body});
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
const Pfp = styled.img`
  height: 3em;
  border-radius: 1.5em;
  padding-right: 0.5em;
`

export default Chat;