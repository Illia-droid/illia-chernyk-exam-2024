import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import {
  addOffer,
  clearAddOfferError,
} from '../../../store/slices/contestByIdSlice';
import Error from '../../Error';
import ImageUpload from '../../InputComponents/ImageUpload';
import FormInput from '../../forms/FormInput';
import styles from './OfferForm.module.scss';
import Schems from '../../../utils/validators/validationSchems';
import CONTANTS from '../../../constants';

const OfferForm = ({ contestId, contestType, customerId }) => {
  const dispatch = useDispatch();
  const clearOfferError = () => dispatch(clearAddOfferError());
  const { addOfferError } = useSelector((state) => state.contestByIdStore);

  const handleSubmit = (values, { resetForm }) => {
    clearOfferError();
    const data = new FormData();
    data.append('contestId', contestId);
    data.append('contestType', contestType);
    data.append('offerData', values.offerData);
    data.append('customerId', customerId);
    dispatch(addOffer(data));
    resetForm();
  };

  const validationSchema =
    contestType === CONTANTS.LOGO_CONTEST
      ? Schems.LogoOfferSchema
      : Schems.TextOfferSchema;

  const renderOfferInput = () =>
    contestType === CONTANTS.LOGO_CONTEST ? (
      <ImageUpload
        name="offerData"
        classes={{
          uploadContainer: styles.imageUploadContainer,
          inputContainer: styles.uploadInputContainer,
          imgStyle: styles.imgStyle,
        }}
      />
    ) : (
      <FormInput
        name="offerData"
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
        }}
        type="text"
        label="your suggestion"
      />
    );

  return (
    <div className={styles.offerContainer}>
      {addOfferError && (
        <Error
          data={addOfferError.data}
          status={addOfferError.status}
          clearError={clearOfferError}
        />
      )}
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          offerData: '',
        }}
        validationSchema={validationSchema}
      >
        <Form className={styles.form}>
          {renderOfferInput()}
          {
            <button type="submit" className={styles.btnOffer}>
              Send Offer
            </button>
          }
        </Form>
      </Formik>
    </div>
  );
};

export default OfferForm;
