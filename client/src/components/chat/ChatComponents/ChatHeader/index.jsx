import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backToDialogList } from '../../../../store/slices/chatSlice';
import FavBlockIcons from '../../FavBlockIcons';
import Avatar from '../../../Avatar';
import CONSTANTS from '../../../../constants';
import styles from './ChatHeader.module.scss';
import Spinner from '../../../Spinner';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const ChatHeader = ({ userId }) => {
  const dispatch = useDispatch();
  const { interlocutor, chatData, isFetching } = useSelector(
    (state) => state.chatStore
  );

  const { avatar, firstName } = interlocutor;
  const { favoriteList, participants, blackList } = chatData;

  const closeChat = () => dispatch(backToDialogList());

  return isFetching ? (
    <Spinner />
  ) : (
    <div className={styles.chatHeader}>
      <div className={styles.buttonContainer} onClick={closeChat}>
        <img src={`${STATIC_IMAGES_PATH}arrow-left-thick.png`} alt="back" />
      </div>
      <div className={styles.infoContainer}>
        <div>
          <Avatar avatar={avatar} />
          <span>{firstName}</span>
        </div>
        {chatData.id && (
          <div>
            <FavBlockIcons
              userId={userId}
              chatData={{ favoriteList, participants, blackList }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
