import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeShowModeCatalog,
  deleteCatalog,
  getCatalogList,
} from '../../../../store/slices/chatSlice';
import Catalog from '../Catalog';
import styles from './CatalogList.module.scss';
import Spinner from '../../../Spinner';

const CatalogList = () => {
  const dispatch = useDispatch();
  const { chatStore } = useSelector((state) => state);
  const { catalogList, isFetching } = chatStore;

  useEffect(() => {
    if (!catalogList) {
      dispatch(getCatalogList());
    }

    return () => {};
  }, []);
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
      key={catalog.id}
      catalog={catalog}
      deleteCatalog={deleteThisCatalog}
      goToCatalog={goToCatalog}
    />
  );

  return isFetching ? (
    <Spinner />
  ) : (
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
