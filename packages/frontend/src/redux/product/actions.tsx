const actions = {
  SINGLE_PRODUCT_BEGIN: 'SINGLE_PRODUCT_BEGIN',
  SINGLE_PRODUCT_SUCCESS: 'SINGLE_PRODUCT_SUCCESS',
  SINGLE_PRODUCT_ERR: 'SINGLE_PRODUCT_ERR',

  FILTER_PRODUCT_BEGIN: 'FILTER_PRODUCT_BEGIN',
  FILTER_PRODUCT_SUCCESS: 'FILTER_PRODUCT_SUCCESS',
  FILTER_PRODUCT_ERR: 'FILTER_PRODUCT_ERR',

  SORTING_PRODUCT_BEGIN: 'SORTING_PRODUCT_BEGIN',
  SORTING_PRODUCT_SUCCESS: 'SORTING_PRODUCT_SUCCESS',
  SORTING_PRODUCT_ERR: 'SORTING_PRODUCT_ERR',

  singleProductBegin: () => {
    return {
      type: actions.SINGLE_PRODUCT_BEGIN,
    };
  },

  singleProductSuccess: (data:any) => {
    return {
      type: actions.SINGLE_PRODUCT_SUCCESS,
      data,
    };
  },

  singleProductErr: (err:any) => {
    return {
      type: actions.SINGLE_PRODUCT_ERR,
      err,
    };
  },

  filterProductBegin: () => {
    return {
      type: actions.FILTER_PRODUCT_BEGIN,
    };
  },

  filterProductSuccess: (data:any) => {
    return {
      type: actions.FILTER_PRODUCT_SUCCESS,
      data,
    };
  },

  filterProductErr: (err:any) => {
    return {
      type: actions.FILTER_PRODUCT_ERR,
      err,
    };
  },

  sortingProductBegin: () => {
    return {
      type: actions.SORTING_PRODUCT_BEGIN,
    };
  },

  sortingProductSuccess: (data:any) => {
    return {
      type: actions.SORTING_PRODUCT_SUCCESS,
      data,
    };
  },

  sortingProductErr: (err:any) => {
    return {
      type: actions.SORTING_PRODUCT_ERR,
      err,
    };
  },
};

export default actions;
