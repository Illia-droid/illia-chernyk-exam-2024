import React from 'react';
import { useDispatch } from 'react-redux';
import {
  changeShowModeCatalog,
  deleteCatalog,
} from '../../../../store/slices/chatSlice';
import Catalog from '../Catalog';
import styles from './CatalogList.module.sass';

const CatalogList = ({ catalogList }) => {
  const dispatch = useDispatch();

  const goToCatalog = (event, catalog) => {
    dispatch(changeShowModeCatalog(catalog));
    event.stopPropagation();
  };

  const deleteThisCatalog = (event, catalogId) => {
    dispatch(deleteCatalog({ catalogId }));
    event.stopPropagation();
  };

  const renderCatalogList = (catalog) => (
    <Catalog
      key={catalog._id}
      catalog={catalog}
      deleteCatalog={deleteThisCatalog}
      goToCatalog={goToCatalog}
    />
  );

  return (
    <section className={styles.listContainer}>
      {catalogList.length ? (
        catalogList.map(renderCatalogList)
      ) : (
        <span className={styles.notFound}>Not found</span>
      )}
    </section>
  );
};

export default CatalogList;
