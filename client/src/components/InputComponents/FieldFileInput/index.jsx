import React, { useState } from 'react';
import { useField } from 'formik';
import styles from './FieldFileInput.module.scss'
const FieldFileInput = ({ classes, ...rest }) => {
  const [, , helpers] = useField(rest.name);
  const { setValue } = helpers;
  const [fileName, setFileName] = useState('');

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setValue(file);
      setFileName(file.name);
    }
  };

  return (
    <div className={styles.fileUploadContainer}>
      <label htmlFor="fileInput" className={styles.label}>
        Choose file
      </label>
      <span className={styles.fileName}>{fileName || 'No file chosen'}</span>
      <input
        className={styles.fileInput}
        id="fileInput"
        type="file"
        onChange={handleChange}
      />
    </div>
  );
};

export default FieldFileInput;
