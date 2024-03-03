const actions = {
  SINGLE_PROJECT_BEGIN: 'SINGLE_PROJECT_BEGIN',
  SINGLE_PROJECT_SUCCESS: 'SINGLE_PROJECT_SUCCESS',
  SINGLE_PROJECT_ERR: 'SINGLE_PROJECT_ERR',

  FILTER_PROJECT_BEGIN: 'FILTER_PROJECT_BEGIN',
  FILTER_PROJECT_SUCCESS: 'FILTER_PROJECT_SUCCESS',
  FILTER_PROJECT_ERR: 'FILTER_PROJECT_ERR',

  SORTING_PROJECT_BEGIN: 'SORTING_PROJECT_BEGIN',
  SORTING_PROJECT_SUCCESS: 'SORTING_PROJECT_SUCCESS',
  SORTING_PROJECT_ERR: 'SORTING_PROJECT_ERR',

  singleProjectBegin: () => {
    return {
      type: actions.SINGLE_PROJECT_BEGIN,
    };
  },

  singleProjectSuccess: (data:any) => {
    return {
      type: actions.SINGLE_PROJECT_SUCCESS,
      data,
    };
  },

  singleProjectErr: (err:any) => {
    return {
      type: actions.SINGLE_PROJECT_ERR,
      err,
    };
  },

  filterProjectBegin: () => {
    return {
      type: actions.FILTER_PROJECT_BEGIN,
    };
  },

  filterProjectSuccess: (data:any) => {
    return {
      type: actions.FILTER_PROJECT_SUCCESS,
      data,
    };
  },

  filterProjectErr: (err:any) => {
    return {
      type: actions.FILTER_PROJECT_ERR,
      err,
    };
  },

  sortingProjectBegin: () => {
    return {
      type: actions.SORTING_PROJECT_BEGIN,
    };
  },

  sortingProjectSuccess: (data:any) => {
    return {
      type: actions.SORTING_PROJECT_SUCCESS,
      data,
    };
  },

  sortingProjectErr: (err:any) => {
    return {
      type: actions.SORTING_PROJECT_ERR,
      err,
    };
  },
};

export default actions;
