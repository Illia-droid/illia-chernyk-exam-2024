import React from 'react';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import styles from './Spinner.module.scss';

const override = css`
  border-color: #46568a;
`;

const Spinner = () => (
  <div className={styles.loaderContainer}>
    <ClipLoader
      sizeUnit='px'
      css={override}
      size={50}
      color='#46568a'
      loading
    />
  </div>
);

export default Spinner;
