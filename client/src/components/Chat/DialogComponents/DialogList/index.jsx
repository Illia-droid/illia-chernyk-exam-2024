import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  goToExpandedDialog,
  changeShowAddChatToCatalogMenu,
  getPreviewChat,
} from '../../../../store/slices/chatSlice';
import DialogBox from '../DialogBox';
import CONSTANTS from '../../../../constants';
import styles from './DialogList.module.scss';

const {
  CATALOG_PREVIEW_CHAT_MODE,
  FAVORITE_PREVIEW_CHAT_MODE,
  BLOCKED_PREVIEW_CHAT_MODE,
} = CONSTANTS;

const DialogList = ({ userId, removeChat }) => {
  const dispatch = useDispatch();
  const { chatMode } = useSelector((state) => state.chatStore);
  const { messagesPreview } = useSelector((state) => state.chatStore);
  useEffect(() => {
    dispatch(getPreviewChat());
    return () => {};
  }, []);

  const handleExpandedDialog = (data) => dispatch(goToExpandedDialog(data));
  const changeShowCatalogCreation = (event, chatId) => {
    dispatch(changeShowAddChatToCatalogMenu(chatId));
    event.stopPropagation();
  };

  const onlyFavoriteDialogs = (chatPreview, userId) =>
    chatPreview.favoriteList[chatPreview.participants.indexOf(userId)];

  const onlyBlockDialogs = (chatPreview, userId) =>
    chatPreview.blackList[chatPreview.participants.indexOf(userId)];

  const renderPreview = (filterFunc) => {
    const filteredList = messagesPreview
      .filter((chatPreview) => !filterFunc || filterFunc(chatPreview, userId))
      .map((chatPreview, index) => (
        <DialogBox
          key={index}
          chatPreview={chatPreview}
          userId={userId}
          chatMode={chatMode}
          catalogOperation={
            chatMode === CATALOG_PREVIEW_CHAT_MODE
              ? removeChat
              : changeShowCatalogCreation
          }
          goToExpandedDialog={handleExpandedDialog}
        />
      ));
    return filteredList.length ? (
      filteredList
    ) : (
      <span className={styles.notFound}>Not found</span>
    );
  };

  const renderChatPreview = () => {
    const filterMap = {
      [FAVORITE_PREVIEW_CHAT_MODE]: onlyFavoriteDialogs,
      [BLOCKED_PREVIEW_CHAT_MODE]: onlyBlockDialogs,
    };
    return renderPreview(filterMap[chatMode]);
  };

  return <div className={styles.previewContainer}>{renderChatPreview()}</div>;
};

export default DialogList;
