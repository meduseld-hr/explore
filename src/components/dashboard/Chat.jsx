import React, {useState, useEffect, useRef, useContext} from 'react';
import {UserContext} from '../../contexts/user';
import api from '../../functions/api';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';

TimeAgo.addDefaultLocale(en);

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
      <div id='messages'>
        {messages.map((message, index) => (
          <div key={index}>
            <div>{message.body}</div>
            <ReactTimeAgo date={message.time_stamp * 1000} locale='en-US' />
            <div>
              <img src={message.picture} height='32' />
              <div>{message.nickname}</div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (body.length) {
          api.post(`/dashboard/2`, {body, timeStamp: Date.now()})
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

export default Chat;