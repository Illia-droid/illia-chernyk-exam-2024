import React from 'react';
import classNames from 'classnames';
import FavBlockIcons from '../../FavBlockIcons';
import Avatar from '../../../Avatar';
import { getMessageTimeStr } from '../../../../utils/functions';
import CONSTANTS from '../../../../constants';
import styles from './DialogBox.module.scss';

const { CATALOG_PREVIEW_CHAT_MODE } = CONSTANTS;

const DialogBox = ({
  chatPreview,
  userId,
  catalogOperation,
  goToExpandedDialog,
  chatMode,
}) => {
  const {
    favoriteList,
    participants,
    blackList,
    _id,
    text,
    createAt,
    interlocutor,
  } = chatPreview;

  const className = classNames(
    chatMode === CATALOG_PREVIEW_CHAT_MODE
      ? 'fas fa-minus-circle'
      : 'far fa-plus-square'
  );
  const handleExtendedDIalog = () =>
    goToExpandedDialog({
      interlocutor,
      conversationData: {
        participants,
        _id,
        blackList,
        favoriteList,
      },
    });
  const handleCatalogOperation = (event) => catalogOperation(event, _id);

  return (
    <div className={styles.previewChatBox} onClick={handleExtendedDIalog}>
      <Avatar avatar={interlocutor.avatar} />
      <div className={styles.infoContainer}>
        <div className={styles.interlocutorInfo}>
          <span className={styles.interlocutorName}>
            {interlocutor.firstName}
          </span>
          <span className={styles.interlocutorMessage}>{text}</span>
        </div>
        <div className={styles.buttonsContainer}>
          <span className={styles.time}>{getMessageTimeStr(createAt)}</span>
          <FavBlockIcons
            userId={userId}
            chatData={{ favoriteList, participants, blackList }}
          />
          <i onClick={handleCatalogOperation} className={className} />
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
