import actions from './actions';
import initialState from '../../demoData/contact.json';

const { readBegin, readSuccess, readErr, starUpdateBegin, starUpdateSuccess, starUpdateErr } = actions;

const contactGetData = () => {
  return async (dispatch:any) => {
    try {
      dispatch(readBegin());
      dispatch(readSuccess(initialState));
    } catch (err) {
      dispatch(readErr(err));
    }
  };
};

const contactAddData = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(readBegin());
      dispatch(readSuccess(data));
    } catch (err) {
      dispatch(readErr(err));
    }
  };
};

const contactDeleteData = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(readBegin());
      dispatch(readSuccess(data));
    } catch (err) {
      dispatch(readErr(err));
    }
  };
};

const contactSearchData = (value:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(readBegin());
      const data = initialState.filter((item) => item.name.toUpperCase().startsWith(value.toUpperCase()));
      dispatch(readSuccess(data));
    } catch (err) {
      dispatch(readErr(err));
    }
  };
};

const onStarUpdate = (data:any, id:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(starUpdateBegin());
      data.map((item:any) => {
        if (item.id === id) {
          const fav = item;
          if (item.stared) {
            fav.stared = false;
          } else {
            fav.stared = true;
          }
        }
        return dispatch(starUpdateSuccess(data));
      });
    } catch (err) {
      dispatch(starUpdateErr(err));
    }
  };
};

export { contactGetData, contactAddData, contactDeleteData, onStarUpdate, contactSearchData };
