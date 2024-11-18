import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import {
  getPreviewChat,
  sendMessage,
} from '../../../../store/slices/chatSlice';
import FormInput from '../../../FormInput';
import Schems from '../../../../utils/validators/validationSchems';
import CONSTANTS from '../../../../constants';
import styles from './ChatInput.module.scss';

const { STATIC_IMAGES_PATH } = CONSTANTS;

const ChatInput = () => {
  const dispatch = useDispatch();
  const { interlocutor, chatData } = useSelector((state) => state.chatStore);
  const handleSubmit = (values, { resetForm }) => {
    dispatch(
      sendMessage({
        messageBody: values.message,
        interlocutorId: interlocutor.id,
        chatData,
      })
    );
    resetForm();
  };

  return (
    <div className={styles.inputContainer}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ message: '' }}
        validationSchema={Schems.MessageSchema}
        validateOnBlur={false}
      >
        {({ values }) => (
          <Form className={styles.form}>
            <FormInput
              name="message"
              type="text"
              label="message"
              classes={{
                container: styles.container,
                input: styles.input,
                notValid: styles.notValid,
              }}
              isMessage
            />
            {values.message && (
              <button type="submit">
                <img src={`${STATIC_IMAGES_PATH}send.png`} alt="send Message" />
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChatInput;
