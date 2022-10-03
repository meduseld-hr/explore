import React, {useState, useEffect, useRef, useContext} from 'react';
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
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <div>{message.body}</div>
            <div>
              <img src={user.picture} height='32' />
              <div>{user.given_name}</div>
            </div>
          </div>
        ))}
      </div>
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

export default Chat;