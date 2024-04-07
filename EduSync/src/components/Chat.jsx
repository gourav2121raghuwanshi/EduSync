import React, { useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux'
import './chat.css'
import axios from 'axios';

import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');



const ChatFooter = ({courseid}) => {
  const [message, setMessage] = useState('');
  const {currentUser} = useSelector((state) => state.user);
  const handleSendMessage = (e) => {
    e.preventDefault();
    const chat = {
      text : message,
      name: currentUser.name,
      course: courseid,
      userid: currentUser._id
    }
    if(message.trim()){
      socket.emit('message', chat);
    }
    console.log(chat);
    setMessage('');
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
}

const ChatBody = ({messages, lastMessageRef}) => {
  const navigate = useNavigate();
  const {currentUser} = useSelector((state) => state.user);

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn rounded-lg" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      {/*This shows messages sent from you*/}
      <div className="message__container">

        {messages.map((message) =>
          message.name === currentUser.name ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
        <div ref={lastMessageRef} />
      </div>
    </>
  );
  }


const Chat = ({courseId}) => {
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(()=>{
    const func = async() => {
      const response = await axios.post(backendUrl+'/api/messages/get', {course:courseId})
      console.log(response.data);
      setMessages(response.data);
    }
    func();
  },[])

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='flex justify-center w-full items-center p-3'>
      <div className=' bg-slate-200 w-full rounded-xl p-1'>
        <ChatBody messages={messages} lastMessageRef={lastMessageRef} />
        <ChatFooter courseid={courseId} />
      </div>
    </div>
  )
}

export default Chat