import React, { forwardRef } from 'react';
import { Avatar } from '@material-ui/core';
import './Message.css';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import * as timeago from 'timeago.js';

const Message = forwardRef(
  (
    { id, data: { timestamp, displayName, email, message, photo, uid } },
    ref
  ) => {
    const user = useSelector(selectUser);

    return (
      <div
        ref={ref}
        className={`message ${user.email === email && `message__sender`}`}
      >
        <Avatar src={photo} className="message__photo" />
        <div className="message__contents">
          <p>{message}</p>
          <small>{timeago.format(new Date(timestamp?.toDate()))}</small>
        </div>
      </div>
    );
  }
);

export default Message;
