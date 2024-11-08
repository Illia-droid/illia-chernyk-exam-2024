import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useField } from 'formik';
import classNames from 'classnames';
import CONSTANTS from '../../../constants';

const { ANONYM_IMAGE_PATH, publicURL } = CONSTANTS;

const ImageUpload = ({ name, classes }) => {
  const {
    data: { avatar },
  } = useSelector((state) => state.userStore);
  const [field, , helpers] = useField(name);
  const { uploadContainer, inputContainer, imgStyle } = classes;
  const [preview, setPreview] = useState(null);
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        helpers.setValue(file);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={uploadContainer}>
      <div className={inputContainer}>
        <span>Support only images (*.png, *.gif, *.jpeg)</span>
        <input
          id="fileInput"
          type="file"
          accept=".jpg, .png, .jpeg"
          onChange={handleChange}
        />
        <label htmlFor="fileInput">Choose file</label>
      </div>
      <img
        src={
          preview ||
          (avatar === 'anon.png' ? ANONYM_IMAGE_PATH : `${publicURL}${avatar}`)
        }
        className={classNames({ [imgStyle]: !!field.value })}
        alt={avatar}
      />
    </div>
  );
};

export default ImageUpload;
