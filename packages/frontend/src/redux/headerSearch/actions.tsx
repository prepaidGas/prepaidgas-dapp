const actions = {
  SEARCH_HEADER_BEGIN: 'SEARCH_HEADER_BEGIN',
  SEARCH_HEADER_SUCCESS: 'SEARCH_HEADER_SUCCESS',
  SEARCH_HEADER_ERR: 'SEARCH_HEADER_ERR',

  searchHeaderBegin: () => {
    return {
      type: actions.SEARCH_HEADER_BEGIN,
    };
  },

  searchHeaderSuccess: (data:any) => {
    return {
      type: actions.SEARCH_HEADER_SUCCESS,
      data,
    };
  },

  searchHeaderErr: (err:any) => {
    return {
      type: actions.SEARCH_HEADER_ERR,
      err,
    };
  },
};

export default actions;
