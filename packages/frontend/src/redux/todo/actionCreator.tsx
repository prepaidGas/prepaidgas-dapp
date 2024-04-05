import actions from './actions';
import initialState from '@/demoData/todo.json';

const { todoReadBegin, todoReadSuccess, todoReadErr, starUpdateBegin, starUpdateSuccess, starUpdateErr } = actions;

const ToDoGetData = () => {
  return async (dispatch:any) => {
    try {
      dispatch(todoReadBegin());
      dispatch(todoReadSuccess(initialState));
    } catch (err) {
      dispatch(todoReadErr(err));
    }
  };
};

const ToDoAddData = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(todoReadBegin());
      dispatch(todoReadSuccess(data));
    } catch (err) {
      dispatch(todoReadErr(err));
    }
  };
};

const ToDoDeleteData = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(todoReadBegin());
      dispatch(todoReadSuccess(data));
    } catch (err) {
      dispatch(todoReadErr(err));
    }
  };
};

const onStarUpdate = (data:any, id:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(starUpdateBegin());
      data.map((item:any) => {
        if (item.key === id) {
          const fav = item;
          if (item.favorite) {
            fav.favorite = false;
          } else {
            fav.favorite = true;
          }
        }
        return dispatch(starUpdateSuccess(data));
      });
    } catch (err) {
      dispatch(starUpdateErr(err));
    }
  };
};

export { ToDoGetData, ToDoAddData, ToDoDeleteData, onStarUpdate };
