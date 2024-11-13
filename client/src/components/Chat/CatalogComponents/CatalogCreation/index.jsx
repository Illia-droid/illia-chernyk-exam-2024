import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import {
  changeTypeOfChatAdding,
  changeShowAddChatToCatalogMenu,
  getCatalogList,
} from '../../../../store/slices/chatSlice';
import AddToCatalog from '../AddToCatalog';
import CreateCatalog from '../CreateCatalog';
import CONSTANTS from '../../../../constants';
import styles from './CatalogCreation.module.scss';
import OptionButton from '../../../OptionButton';

const { ADD_CHAT_TO_OLD_CATALOG, CREATE_NEW_CATALOG_AND_ADD_CHAT } = CONSTANTS;

const buttons = [
  { label: 'Old', mode: ADD_CHAT_TO_OLD_CATALOG },
  { label: 'New', mode: CREATE_NEW_CATALOG_AND_ADD_CHAT },
];

const CatalogCreation = () => {
  const dispatch = useDispatch();
  const { catalogCreationMode, isFetching } = useSelector(
    (state) => state.chatStore
  );

  useEffect(() => {
    dispatch(getCatalogList()); //eslint-disable-next-line
  }, []);

  const closeAddChatToCatalogMenu = () =>
    dispatch(changeShowAddChatToCatalogMenu());
  const changeModeOfChatAdding = (data) =>
    dispatch(changeTypeOfChatAdding(data));

  const renderButtons = ({ label, mode }) => (
    <OptionButton
      key={label}
      label={label}
      onClick={() => changeModeOfChatAdding(mode)}
      className={classNames(styles.modeButton, {
        [styles.active]: catalogCreationMode === mode,
      })}
    />
  );

  return (
    <>
      {!isFetching && (
        <div className={styles.catalogCreationContainer}>
          <i
            className="far fa-times-circle"
            onClick={closeAddChatToCatalogMenu}
          />
          <div className={styles.buttonsContainer}>
            {buttons.map(renderButtons)}
          </div>
          {catalogCreationMode === CREATE_NEW_CATALOG_AND_ADD_CHAT ? (
            <CreateCatalog />
          ) : (
            <AddToCatalog />
          )}
        </div>
      )}
    </>
  );
};

export default CatalogCreation;
