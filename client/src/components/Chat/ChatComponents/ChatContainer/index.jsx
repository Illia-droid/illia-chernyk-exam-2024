import React from 'react';
import { useSelector } from 'react-redux';
import Chat from '../Chat';
import CONSTANTS from '../../../../constants';

const { MODERATOR } = CONSTANTS;

const ChatContainer = () => {
  const { data } = useSelector((state) => state.userStore);
  return data && data.role !== MODERATOR ? <Chat /> : null;
};

export default ChatContainer;
