import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import {
  changeShowModeCatalog,
  changeRenameCatalogMode,
  changeCatalogName,
  getCatalogList,
} from '../../../../store/slices/chatSlice';
import FormInput from '../../../FormInput';
import Schems from '../../../../utils/validators/validationSchems';
import styles from './CatalogHeader.module.scss';

const CatalogListHeader = () => {
  const dispatch = useDispatch();
  const { isRenameCatalog, currentCatalog } = useSelector(
    (state) => state.chatStore
  );
  const { catalogName, id } = currentCatalog;

  const handleSubmit = (values) => {
    dispatch(
      changeCatalogName({ catalogName: values.catalogName, catalogId: id })
    );
  };
  const closeChangeModeCatalog = () => {
    dispatch(getCatalogList());
    dispatch(changeShowModeCatalog());
  };
  const renameCatalogMode = () => dispatch(changeRenameCatalogMode());

  return (
    <header className={styles.headerContainer}>
      <i
        className="fas fa-long-arrow-alt-left"
        onClick={closeChangeModeCatalog}
      />
      {!isRenameCatalog && (
        <div className={styles.infoContainer}>
          <span>{catalogName}</span>
          <i className="fas fa-edit" onClick={renameCatalogMode} />
        </div>
      )}
      {isRenameCatalog && (
        <div className={styles.changeContainer}>
          <Formik
            onSubmit={handleSubmit}
            initialValues={{ catalogName }}
            validationSchema={Schems.CatalogSchema}
          >
            <Form>
              <FormInput
                name="catalogName"
                classes={{
                  container: styles.inputContainer,
                  input: styles.input,
                  warning: styles.fieldWarning,
                  notValid: styles.notValid,
                }}
                type="text"
                label="Catalog Name"
              />
              <button className={styles.submitButton} type="submit">
                Change
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </header>
  );
};

export default CatalogListHeader;
