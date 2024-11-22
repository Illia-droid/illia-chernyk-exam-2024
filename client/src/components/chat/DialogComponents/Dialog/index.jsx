import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import className from 'classnames';
import { getDialogMessages } from '../../../../store/slices/chatSlice';
import ChatHeader from '../../ChatComponents/ChatHeader';
import ChatInput from '../../ChatComponents/ChatInut';
import styles from './Dialog.module.scss';
import Spinner from '../../../Spinner';

const Dialog = ({ userId }) => {
  const dispatch = useDispatch();
  const { chatData, interlocutor, messages } = useSelector(
    (state) => state.chatStore
  );
  const messagesEnd = useRef(null);

  useEffect(() => {
    if (messages.length === 0) {
      dispatch(getDialogMessages({ interlocutorId: interlocutor.id }));
    }
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dispatch, interlocutor.id, messages.length]);

  const renderMainDialog = () => (
    <div className={styles.messageList}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={className(
            userId === message.sender ? styles.ownMessage : styles.message
          )}
        >
          <span>{message.body}</span>
          <span className={styles.messageTime}>
            {moment(message.createdAt).format('HH:mm')}
          </span>
        </div>
      ))}
      <div ref={messagesEnd}></div>
    </div>
  );

  const blockMessage = () => {
    const userIndex = chatData.participants.indexOf(userId);
    let message;
    if (chatData.blackList[userIndex]) {
      message = 'You block him';
    } else if (chatData.blackList.includes(true)) {
      message = 'He block you';
    }
    return <span className={styles.messageBlock}>{message}</span>;
  };
  return !messages ? (
    <Spinner />
  ) : (
    <>
      <ChatHeader userId={userId} />
      {renderMainDialog()}
      {chatData.blackList.includes(true) ? blockMessage() : <ChatInput />}
    </>
  );
};

export default Dialog;
