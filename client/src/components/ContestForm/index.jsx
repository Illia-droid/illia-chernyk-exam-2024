import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getDataForContest } from '../../store/slices/dataForContestSlice';
import Spinner from '../Spinner';
import FormInput from '../FormInput';
import SelectInput from '../SelectInput';
import OptionalSelects from '../OptionalSelects';
import FieldFileInput from '../InputComponents/FieldFileInput';
import FormTextArea from '../InputComponents/FormTextArea';
import TryAgain from '../TryAgain';
import Schems from '../../utils/validators/validationSchems';
import CONSTANTS from '../../constants';
import styles from './ContestForm.module.sass';

const { NAME_CONTEST, LOGO_CONTEST, TAGLINE_CONTEST } = CONSTANTS;

const variableOptions = {
  [NAME_CONTEST]: {
    styleName: '',
    typeOfName: '',
  },
  [LOGO_CONTEST]: {
    nameVenture: '',
    brandStyle: '',
  },
  [TAGLINE_CONTEST]: {
    nameVenture: '',
    typeOfTagline: '',
  },
};

const ContestForm = ({ contestType, defaultData, handleSubmit, formRef }) => {
  const dispatch = useDispatch();
  const { isEditContest } = useSelector((state) => state.contestByIdStore);
  const dataForContest = useSelector((state) => state.dataForContest);
  const { data, isFetching, error } = dataForContest;

  const getPreference = () => {
    switch (contestType) {
      case NAME_CONTEST: {
        dispatch(
          getDataForContest({
            characteristic1: 'nameStyle',
            characteristic2: 'typeOfName',
          })
        );
        break;
      }
      case TAGLINE_CONTEST: {
        dispatch(getDataForContest({ characteristic1: 'typeOfTagline' }));
        break;
      }
      case LOGO_CONTEST: {
        dispatch(getDataForContest({ characteristic1: 'brandStyle' }));
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    getPreference(); //eslint-disable-next-line
  }, []);

  return (
    <>
      {error && <TryAgain getData={getPreference} />}
      {isFetching && <Spinner />}
      {!isFetching && (
        <div className={styles.formContainer}>
          <Formik
            initialValues={{
              title: '',
              industry: '',
              focusOfWork: '',
              targetCustomer: '',
              file: '',
              ...variableOptions[contestType],
              ...defaultData,
            }}
            onSubmit={handleSubmit}
            validationSchema={Schems.ContestSchem}
            innerRef={formRef}
            enableReinitialize
          >
            <Form encType="multipart/form-data">
              <div className={styles.inputContainer}>
                <span className={styles.inputHeader}>Title of contest</span>
                <FormInput
                  name="title"
                  type="text"
                  label="Title"
                  classes={{
                    container: styles.componentInputContainer,
                    input: styles.input,
                    warning: styles.warning,
                  }}
                />
              </div>
              <div className={styles.inputContainer}>
                <SelectInput
                  name="industry"
                  classes={{
                    inputContainer: styles.selectInputContainer,
                    inputHeader: styles.selectHeader,
                    selectInput: styles.select,
                    warning: styles.warning,
                  }}
                  header="Describe industry associated with your venture"
                  optionsArray={data.industry}
                />
              </div>
              <div className={styles.inputContainer}>
                <span className={styles.inputHeader}>
                  What does your company / business do?
                </span>
                <FormTextArea
                  name="focusOfWork"
                  type="text"
                  label="e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper"
                  classes={{
                    container: styles.componentInputContainer,
                    inputStyle: styles.textArea,
                    warning: styles.warning,
                  }}
                />
              </div>
              <div className={styles.inputContainer}>
                <span className={styles.inputHeader}>
                  Tell us about your customers
                </span>
                <FormTextArea
                  name="targetCustomer"
                  type="text"
                  label="customers"
                  classes={{
                    container: styles.componentInputContainer,
                    inputStyle: styles.textArea,
                    warning: styles.warning,
                  }}
                />
              </div>
              <OptionalSelects
                dataForContest={dataForContest}
                contestType={contestType}
              />
              <FieldFileInput
                name="file"
                classes={{
                  fileUploadContainer: styles.fileUploadContainer,
                  labelClass: styles.label,
                  fileNameClass: styles.fileName,
                  fileInput: styles.fileInput,
                  warning: styles.warning,
                }}
              />
              {isEditContest ? (
                <button type="submit" className={styles.changeData}>
                  Set Data
                </button>
              ) : null}
            </Form>
          </Formik>
        </div>
      )}
    </>
  );
};

export default withRouter(ContestForm);
