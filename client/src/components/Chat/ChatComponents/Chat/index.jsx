import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  changeChatShow,
  setPreviewChatMode,
  clearChatError,
  getPreviewChat,
  backToDialogList,
} from '../../../../store/slices/chatSlice';
import { chatController } from '../../../../api/ws/socketController';
import DialogListContainer from '../../DialogComponents/DialogListContainer';
import Dialog from '../../DialogComponents/Dialog';
import CatalogListContainer from '../../CatalogComponents/CatalogListContainer';
import CatalogCreation from '../../CatalogComponents/CatalogCreation';
import CatalogListHeader from '../../CatalogComponents/CatalogListHeader';
import ChatError from '../../../ChatError';
import CONSTANTS from '../../../../constants';
import styles from './Chat.module.scss';

const {
  NORMAL_PREVIEW_CHAT_MODE,
  FAVORITE_PREVIEW_CHAT_MODE,
  BLOCKED_PREVIEW_CHAT_MODE,
  CATALOG_PREVIEW_CHAT_MODE,
} = CONSTANTS;

const previewModes = [
  { label: 'Normal', mode: NORMAL_PREVIEW_CHAT_MODE },
  { label: 'Favorite', mode: FAVORITE_PREVIEW_CHAT_MODE },
  { label: 'Blocked', mode: BLOCKED_PREVIEW_CHAT_MODE },
  { label: 'Catalog', mode: CATALOG_PREVIEW_CHAT_MODE },
];

const Chat = () => {
  const dispatch = useDispatch();
  const { chatStore, userStore } = useSelector((state) => state);
  const {
    chatMode,
    isShowChatsInCatalog,
    isExpanded,
    isShow,
    isShowCatalogCreation,
    error,
  } = chatStore;
  const { id } = userStore.data;

  useEffect(() => {
    chatController.subscribeChat(id);
    getChatPreview();
    return () => {
      chatController.unsubscribeChat(id);
      dispatch(clearChatError());
      dispatch(backToDialogList());
    }; //eslint-disable-next-line
  }, []);

  const getChatPreview = () => dispatch(getPreviewChat());
  const toggleChat = () => dispatch(changeChatShow());
  const setChatPreviewMode = (mode) => dispatch(setPreviewChatMode(mode));

  const renderPreviewButtons = ({ label, mode }) => (
    <span
      key={mode}
      onClick={() => setChatPreviewMode(mode)}
      className={classNames(styles.button, {
        [styles.activeButton]: chatMode === mode,
      })}
    >
      {label}
    </span>
  );
  const renderDialogList = () => {
    return (
      <div>
        {isShowChatsInCatalog && <CatalogListHeader />}
        {!isShowChatsInCatalog && (
          <div className={styles.chatHeader}>
            <img src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt="logo" />
          </div>
        )}
        {!isShowChatsInCatalog && (
          <div className={styles.buttonsContainer}>
            {previewModes.map(renderPreviewButtons)}
          </div>
        )}
        {chatMode === CATALOG_PREVIEW_CHAT_MODE ? (
          <CatalogListContainer />
        ) : (
          <DialogListContainer userId={id} />
        )}
      </div>
    );
  };

  return (
    <div
      className={classNames(styles.chatContainer, {
        [styles.showChat]: isShow,
      })}
    >
      {error && <ChatError getData={getChatPreview} />}
      {isShowCatalogCreation && <CatalogCreation />}
      {isExpanded ? <Dialog userId={id} /> : renderDialogList()}
      <div className={styles.toggleChat} onClick={toggleChat}>
        {isShow ? 'Hide Chat' : 'Show Chat'}
      </div>
    </div>
  );
};

export default Chat;
