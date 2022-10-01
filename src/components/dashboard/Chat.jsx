import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';

const Chat = () => {

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:3000", {
      withCredentials: false
    });
    return () => {
      socket.current.disconnect();
    }
  }, []);

  return (
    <div>
      Chat goes here
    </div>
  )

};

export default Chat;