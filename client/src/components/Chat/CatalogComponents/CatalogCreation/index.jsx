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
import styles from './CatalogCreation.module.sass';

const { ADD_CHAT_TO_OLD_CATALOG, CREATE_NEW_CATALOG_AND_ADD_CHAT } = CONSTANTS;

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

  return (
    <>
      {!isFetching && (
        <div className={styles.catalogCreationContainer}>
          <i
            className="far fa-times-circle"
            onClick={closeAddChatToCatalogMenu}
          />
          <div className={styles.buttonsContainer}>
            <span
              onClick={() => changeModeOfChatAdding(ADD_CHAT_TO_OLD_CATALOG)}
              className={classNames({
                [styles.active]:
                  catalogCreationMode === ADD_CHAT_TO_OLD_CATALOG,
              })}
            >
              Old
            </span>
            <span
              onClick={() =>
                changeModeOfChatAdding(CREATE_NEW_CATALOG_AND_ADD_CHAT)
              }
              className={classNames({
                [styles.active]:
                  catalogCreationMode === CREATE_NEW_CATALOG_AND_ADD_CHAT,
              })}
            >
              New
            </span>
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
