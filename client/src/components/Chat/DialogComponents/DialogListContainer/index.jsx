import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPreviewChat } from '../../../../store/slices/chatSlice';
import DialogList from '../DialogList';

const DialogListContainer = ({ userId }) => {
  const dispatch = useDispatch();
  const { messagesPreview } = useSelector((state) => state.chatStore);
  useEffect(() => {
    dispatch(getPreviewChat()); //eslint-disable-next-line
  }, []);

  return <DialogList preview={messagesPreview} userId={userId} />;
};

export default DialogListContainer;
