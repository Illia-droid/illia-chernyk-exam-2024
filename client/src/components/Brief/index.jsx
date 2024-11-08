import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateContest,
  clearContestUpdationStore,
} from '../../store/slices/contestUpdationSlice';
import { changeEditContest } from '../../store/slices/contestByIdSlice';
import ContestForm from '../ContestForm';
import ContestInfo from '../Contest/ContestInfo';
import Error from '../Error';
import styles from './Brief.module.sass';

const Brief = ({ contestData, role }) => {
  const dispatch = useDispatch();
  const { isEditContest } = useSelector((state) => state.contestByIdStore);
  const { contestUpdationStore, userStore } = useSelector((state) => state);
  const { error } = contestUpdationStore;
  const { id } = userStore.data;

  const handleChangeEditContest = (data) => dispatch(changeEditContest(data));
  const clearError = () => dispatch(clearContestUpdationStore());

  const setNewContestData = (values) => {
    const data = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== 'file' && values[key]) {
        data.append(key, values[key]);
      }
    });
    if (values.file instanceof File) {
      data.append('file', values.file);
    }
    data.append('contestId', contestData.id);
    dispatch(updateContest(data));
  };

  const getContestObjInfo = () => {
    const { originalFileName, ...rest } = contestData;
    return {
      ...Object.fromEntries(Object.entries(rest).filter(([, value]) => value)),
      ...(originalFileName ? { file: { name: originalFileName } } : {}),
    };
  };

  return (
    <>
      {!isEditContest ? (
        <ContestInfo
          userId={id}
          contestData={contestData}
          changeEditContest={handleChangeEditContest}
          role={role}
        />
      ) : (
        <div className={styles.contestForm}>
          {error && (
            <Error
              data={error.data}
              status={error.status}
              clearError={clearError}
            />
          )}
          <ContestForm
            contestType={contestData.contestType}
            defaultData={getContestObjInfo()}
            handleSubmit={setNewContestData}
          />
        </div>
      )}
    </>
  );
};

export default withRouter(Brief);
