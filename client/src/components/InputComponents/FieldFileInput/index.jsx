import React, { useState } from 'react';
import { useField } from 'formik';

const FieldFileInput = ({ classes, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;
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
    <div className={fileUploadContainer}>
      <label htmlFor="fileInput" className={labelClass}>
        Choose file
      </label>
      <span className={fileNameClass}>{fileName || 'No file chosen'}</span>
      <input
        className={fileInput}
        id="fileInput"
        type="file"
        onChange={handleChange}
      />
    </div>
  );
};

export default FieldFileInput;
