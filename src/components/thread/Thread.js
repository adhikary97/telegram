import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import {
  MoreHoriz,
  SendRounded,
  MicNoneOutlined,
  AttachFileOutlined,
  TimerOutlined,
  EmojiEmotionsOutlined,
} from '@material-ui/icons';
import './Thread.css';
import Message from './Message';
import { useSelector } from 'react-redux';
import { selectThreadId, selectThreadName } from '../../features/threadSlice';
import db from '../../firebase';
import firebase from 'firebase';
import { selectUser } from '../../features/userSlice';
import FlipMove from 'react-flip-move';
import * as timeago from 'timeago.js';

const MessageArea = () => {
  const [input, setInput] = useState('');
  const [notEmpty, setNotEmpty] = useState(false);
  const [messages, setMessages] = useState([]);
  const threadName = useSelector(selectThreadName);
  const threadId = useSelector(selectThreadId);
  const user = useSelector(selectUser);
  const [selfDestruct, setSelfDestruct] = useState(0);

  useEffect(() => {
    if (threadId) {
      db.collection('threads')
        .doc(threadId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [threadId]);

  const sendMessage = (e) => {
    e.preventDefault();
    handleTimeOut(input, user.uid);
    db.collection('threads').doc(threadId).collection('messages').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      uid: user.uid,
      photo: user.photo,
      email: user.email,
      displayName: user.displayName,
    });
    setInput('');
  };

  useEffect(() => {
    if (input !== '') {
      setNotEmpty(true);
    } else {
      setNotEmpty(false);
    }
  }, [input]);

  const startTimeOut = (input, uid) => {
    console.log('this worked');
    db.collection('threads')
      .doc(threadId)
      .collection('messages')
      .where('message', '==', input)
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              console.log('Message successfully deleted!');
            })
            .catch(function (error) {
              console.error('Error removing message: ', error);
            });
        });
      });
  };

  const handleTimeOut = (input, uid) => {
    console.log(selfDestruct);
    if (selfDestruct !== null && selfDestruct !== '' && selfDestruct !== 0) {
      setTimeout(() => startTimeOut(input, uid), parseInt(selfDestruct) * 1000);
    }
  };

  return (
    <div className="thread">
      <div className="thread__header">
        <div className="thread__header__contents">
          <Avatar src={messages[0]?.data?.photo} />
          <div className="thread__header__contents__info">
            <h4>{threadName}</h4>
            <h5>
              Last seen{' '}
              {timeago.format(new Date(messages[0]?.data.timestamp?.toDate()))}
            </h5>
          </div>
        </div>
        <IconButton>
          <MoreHoriz className="thread__header__details" />
        </IconButton>
      </div>
      <div className="thread__messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} data={data} />
          ))}
        </FlipMove>
      </div>
      <div className="thread__input">
        <form>
          <IconButton>
            <AttachFileOutlined />
          </IconButton>
          <input
            placeholder="Write a message..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            onClick={() =>
              setSelfDestruct(
                prompt(
                  'Enter the delay in seconds to self destruct the message. Enter 0 if you do not want to self destruct.'
                )
              )
            }
          >
            <TimerOutlined />
          </IconButton>
          <IconButton>
            <EmojiEmotionsOutlined />
          </IconButton>
          {(notEmpty && (
            <IconButton onClick={sendMessage} type="submit">
              <SendRounded />
            </IconButton>
          )) || (
            <IconButton>
              <MicNoneOutlined />
            </IconButton>
          )}
        </form>
      </div>
    </div>
  );
};

export default MessageArea;
