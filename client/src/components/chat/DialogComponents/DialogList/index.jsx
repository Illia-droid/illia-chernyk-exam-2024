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
import Spinner from '../../../Spinner';

const {
  CATALOG_PREVIEW_CHAT_MODE,
  FAVORITE_PREVIEW_CHAT_MODE,
  BLOCKED_PREVIEW_CHAT_MODE,
} = CONSTANTS;

const DialogList = (props) => {
  const dispatch = useDispatch();
  const { chatMode } = useSelector((state) => state.chatStore);
  const { messagesPreview, isFetching } = useSelector(
    (state) => state.chatStore
  );

  useEffect(() => {
    dispatch(getPreviewChat());
  }, [messagesPreview.length]);

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
    const arrayList = [];
    const { userId, preview, removeChat } = props;

    preview.forEach((chatPreview, index) => {
      const dialogNode = (
        <DialogBox
          interlocutor={chatPreview.interlocutor}
          chatPreview={chatPreview}
          userId={userId}
          key={index}
          chatMode={chatMode}
          catalogOperation={
            chatMode === CATALOG_PREVIEW_CHAT_MODE
              ? removeChat
              : changeShowCatalogCreation
          }
          goToExpandedDialog={handleExpandedDialog}
        />
      );
      if (filterFunc && filterFunc(chatPreview, userId)) {
        arrayList.push(dialogNode);
      } else if (!filterFunc) {
        arrayList.push(dialogNode);
      }
    });

    return arrayList.length ? (
      arrayList
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

  return isFetching ? (
    <Spinner />
  ) : (
    <div className={styles.previewContainer}>{renderChatPreview()}</div>
  );
};

export default DialogList;
