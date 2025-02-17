import React from 'react';

import SelectInput from '../forms/SelectInput';
import FormInput from '../forms/FormInput';
import Spinner from '../Spinner';
import CONSTANTS from '../../constants';
import styles from '../forms/ContestForm/ContestForm.module.scss';

const { NAME_CONTEST, LOGO_CONTEST, TAGLINE_CONTEST } = CONSTANTS;

const OptionalSelects = ({
  contestType,
  dataForContest: { isFetching, data },
}) => {
  if (isFetching) {
    return <Spinner />;
  }
  switch (contestType) {
    case NAME_CONTEST: {
      return (
        <>
          <SelectInput
            name="typeOfName"
            header="Type of company"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={data.typeOfName}
          />
          <SelectInput
            name="styleName"
            header="Style name"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={data.nameStyle}
          />
        </>
      );
    }
    case LOGO_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="name of venture"
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
            />
          </div>
          <SelectInput
            name="brandStyle"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header="Brand Style"
            optionsArray={data.brandStyle}
          />
        </>
      );
    }
    case TAGLINE_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="name of venture"
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
            />
          </div>
          <SelectInput
            name="typeOfTagline"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            header="Type tagline"
            optionsArray={data.typeOfTagline}
          />
        </>
      );
    }
    default:
      break;
  }
};

export default OptionalSelects;
