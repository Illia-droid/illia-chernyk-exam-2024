import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCatalogList,
  removeChatFromCatalog,
} from '../../../../store/slices/chatSlice';
import CatalogList from '../CatalogList';
import DialogList from '../../DialogComponents/DialogList';
import Spinner from '../../../Spinner';

const CatalogListContainer = () => {
  const dispatch = useDispatch();
  const { chatStore, userStore } = useSelector((state) => state);
  const {
    catalogList,
    isShowChatsInCatalog,
    currentCatalog,
    messagesPreview,
    isFetching,
  } = chatStore;

  const { id } = userStore.data;

  useEffect(() => {
    dispatch(getCatalogList());
  }, [dispatch, catalogList.length]);

  const removeChat = (event, chatId) => {
    const { id } = currentCatalog;
    dispatch(removeChatFromCatalog({ chatId, catalogId: id }));
    event.stopPropagation();
  };

  const getDialogsPreview = () => {
    const { chats } = currentCatalog;
    return messagesPreview.filter(
      (message) => chats && chats.some((chat) => chat.id === message.id)
    );
  };

  return isFetching ? (
    <Spinner />
  ) : (
    <>
      {isShowChatsInCatalog ? (
        <DialogList
          userId={id}
          removeChat={removeChat}
          preview={getDialogsPreview()}
        />
      ) : (
        <CatalogList catalogList={catalogList} />
      )}
    </>
  );
};

export default CatalogListContainer;
