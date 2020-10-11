import React from 'react';
import Thread from './thread/Thread';
import Sidebar from './sidebar/Sidebar';
import './Telegram.css';

const Telegram = () => {
  return (
    <div className="telegram">
      <Sidebar />
      <Thread />
    </div>
  );
};

export default Telegram;
