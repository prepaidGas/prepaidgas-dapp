import actions from './actions';
import initialState from '@/demoData/projectData.json';

const {
  singleProjectBegin,
  singleProjectSuccess,
  singleProjectErr,

  filterProjectBegin,
  filterProjectSuccess,
  filterProjectErr,

  sortingProjectBegin,
  sortingProjectSuccess,
  sortingProjectErr,
} = actions;

const filterSinglePage = (paramsId:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(singleProjectBegin());
      const data = initialState.filter((project) => {
        return project.id === parseInt(paramsId, 10);
      });
      dispatch(singleProjectSuccess(data));
    } catch (err) {
      dispatch(singleProjectErr(err));
    }
  };
};

const filterProjectByStatus = (status:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(filterProjectBegin());
      const data = initialState.filter((project) => {
        if (status !== 'all') {
          return project.status === status;
        }
        return initialState;
      });
      dispatch(filterProjectSuccess(data));
    } catch (err:any) {
      dispatch(filterProjectErr(err.toString()));
    }
  };
};

const sortingProjectByCategory = (sortBy:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(sortingProjectBegin());
      const data = initialState.sort((a:any, b:any) => {
        return b[sortBy] - a[sortBy];
      });

      setTimeout(() => {
        dispatch(sortingProjectSuccess(data));
      }, 500);
    } catch (err) {
      dispatch(sortingProjectErr(err));
    }
  };
};

export { filterSinglePage, filterProjectByStatus, sortingProjectByCategory };
