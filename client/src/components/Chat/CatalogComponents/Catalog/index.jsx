import React from 'react';
import styles from './Catalog.module.sass';

const Catalog = ({ deleteCatalog, goToCatalog, catalog }) => {
  const { catalogName, chats, _id } = catalog;
  const openCatalog = (event) => goToCatalog(event, catalog);
  const deleteThisCatalog = (event) => deleteCatalog(event, _id)
  return (
    <div className={styles.catalogContainer} onClick={openCatalog}>
      <span className={styles.catalogName}>{catalogName}</span>
      <div className={styles.infoContainer}>
        <span>Chats number: </span>
        <span className={styles.numbers}>{chats.length}</span>
        <i
          className="fas fa-trash-alt"
          onClick={deleteThisCatalog}
        />
      </div>
    </div>
  );
};

export default Catalog;