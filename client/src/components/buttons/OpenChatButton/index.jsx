import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { goToExpandedDialog } from '../../../store/slices/chatSlice';
import styles from './OpenChatButton.module.scss';

const OpenChatButton = ({ User }) => {
  const dispatch = useDispatch();
  const { id: authUserId } = useSelector((state) => state.userStore.data);
  const { messagesPreview } = useSelector((state) => state.chatStore);
  const { id: creatorId } = User;

  const participants = [authUserId, creatorId];
  participants.sort((a, b) => a - b);

  const findConversationInfo = () => {
    const conversation = messagesPreview.find((message) =>
      isEqual(participants, message.participants)
    );

    return conversation
      ? {
          participants: conversation.participants,
          _id: conversation._id,
          blackList: conversation.blackList,
          favoriteList: conversation.favoriteList,
        }
      : {
          participants,
          blackList: [false, false],
          favoriteList: [false, false],
        };
  };

  const goChat = () => {
    dispatch(
      goToExpandedDialog({
        interlocutor: User,
        conversationData: findConversationInfo(),
      })
    );
  };
  return (
    <button className={styles.openChatButton}>
      <i onClick={goChat} className="fas fa-comments" />
    </button>
  );
};

export default OpenChatButton;
