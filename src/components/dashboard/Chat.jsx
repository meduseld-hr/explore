import React, {useState, useEffect, useRef, useContext} from 'react';
import {UserContext} from '../../contexts/user';
import axios from 'axios';

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
    axios.get('api/dashboard/2')
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
          axios.post(`/api/dashboard/2`, {body: body, timeStamp: Date.now()})
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