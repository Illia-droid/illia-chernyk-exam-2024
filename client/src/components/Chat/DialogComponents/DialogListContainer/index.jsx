import React from 'react';
import DialogList from '../DialogList';
import { useSelector } from 'react-redux';

const DialogListContainer = ({ userId }) => {
  const { chatStore } = useSelector((state) => state);
  const { messagesPreview } = chatStore;
  return <DialogList userId={userId} preview={messagesPreview} />;
};

export default DialogListContainer;
