import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { addChatToCatalog } from '../../../../store/slices/chatSlice';
import SelectInput from '../../../SelectInput';
import styles from './AddToCatalog.module.sass';

const AddToCatalog = () => {
  const dispatch = useDispatch();
  const { catalogList, addChatId } = useSelector((state) => state.chatStore);

  const getCatalogsNames = () =>
    catalogList.map((catalog) => catalog.catalogName);

  const getValueArray = () => catalogList.map((catalog) => catalog._id);

  const handleSubmit = (values) => {
    dispatch(
      addChatToCatalog({ chatId: addChatId, catalogId: values.catalogId })
    );
  };

  return (
    <>
      {catalogList.length !== 0 ? (
        <Formik
          onSubmit={handleSubmit}
          initialValues={{ catalogId: '' }}
        >
          <Form className={styles.form}>
            <SelectInput
              name="catalogId"
              header="name of catalog"
              classes={{
                inputContainer: styles.selectInputContainer,
                inputHeader: styles.selectHeader,
                selectInput: styles.select,
              }}
              optionsArray={getCatalogsNames()}
              valueArray={getValueArray()}
            />
            <button type="submit">Add</button>
          </Form>
        </Formik>
      ) : (
        <p className={styles.notFound}>
          You have not created any directories.
        </p>
      )}
    </>
  );
};

export default AddToCatalog;
