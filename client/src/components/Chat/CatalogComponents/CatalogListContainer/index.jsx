import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCatalogList,
  removeChatFromCatalog,
} from '../../../../store/slices/chatSlice';
import CatalogList from '../CatalogList';
import DialogList from '../../DialogComponents/DialogList';

const CatalogListContainer = () => {
  const dispatch = useDispatch();
  const { chatStore, userStore } = useSelector((state) => state);
  const { catalogList, isShowChatsInCatalog, currentCatalog } = chatStore;
  const { id } = userStore.data;

  useEffect(() => {
    dispatch(getCatalogList());
  }, [dispatch]);

  const removeChat = (event, chatId) => {
    const { _id } = currentCatalog;
    dispatch(removeChatFromCatalog({ chatId, catalogId: _id }));
    event.stopPropagation();
  };

  return (
    <>
      {isShowChatsInCatalog ? (
        <DialogList userId={id} removeChat={removeChat} />
      ) : (
        <CatalogList catalogList={catalogList} />
      )}
    </>
  );
};

export default CatalogListContainer;
