import actions from './actions';
import initialState from '../../demoData/jobs.json';

const {
  jobsReadBegin,
  jobsReadSuccess,
  jobsReadErr,
  filterSinglePageReadBegin,
  filterSinglePageReadSuccess,
  filterSinglePageReadErr,
} = actions;

const jobsReadData = () => {
  return async (dispatch:any) => {
    try {
      dispatch(jobsReadBegin());
      dispatch(jobsReadSuccess(initialState));
    } catch (err) {
      dispatch(jobsReadErr(err));
    }
  };
};

const jobsUpdateData = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(jobsReadBegin());
      dispatch(jobsReadSuccess(data));
    } catch (err) {
      dispatch(jobsReadErr(err));
    }
  };
};

const jobsUpdateSearch = (value:any, key:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(jobsReadBegin());
      const data = initialState.filter((item:any) => item[key].startsWith(value));
      dispatch(jobsReadSuccess(data));
    } catch (err) {
      dispatch(jobsReadErr(err));
    }
  };
};

const sorting = (sortBy:any, oldState:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(jobsReadBegin());
      setTimeout(() => {
        const data = oldState.sort((a:any, b:any) => {
          return sortBy === 'Old' ? b.id - a.id : a.id - b.id;
        });
        dispatch(jobsReadSuccess(data));
      }, 100);
    } catch (err) {
      dispatch(jobsReadErr(err));
    }
  };
};

const filterWithTitleLocation = (title:any, location:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(jobsReadBegin());
      setTimeout(() => {
        const data = initialState.filter((item) => {
          return (
            item.title.toLowerCase().indexOf(title.toLowerCase()) >= 0 &&
            item.location.toLowerCase().indexOf(location.toLowerCase()) >= 0
          );
        });
        dispatch(jobsReadSuccess(data));
      }, 100);
    } catch (err) {
      dispatch(jobsReadErr(err));
    }
  };
};

const singlePageReade = (id:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(filterSinglePageReadBegin());
      const data = initialState.filter((item:any) => parseInt(item.id) === parseInt(id));

      dispatch(filterSinglePageReadSuccess(data));
    } catch (err) {
      dispatch(filterSinglePageReadErr(err));
    }
  };
};

export { filterWithTitleLocation, sorting, jobsReadData, jobsUpdateData, jobsUpdateSearch, singlePageReade };
