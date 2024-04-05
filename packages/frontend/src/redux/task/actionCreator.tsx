import actions from './actions';

const {
  taskReadBegin,
  taskReadSuccess,
  taskReadErr,
  starUpdateBegin,
  starUpdateSuccess,
  starUpdateErr,
  completeUpdateBegin,
  completeUpdateSuccess,
  completeUpdateErr,
} = actions;

const taskAddData = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(taskReadBegin());
      dispatch(taskReadSuccess(data));
    } catch (err) {
      dispatch(taskReadErr(err));
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
          if (fav.favourite) {
            item.favourite = false;
          } else {
            fav.favourite = true;
          }
        }
        return dispatch(starUpdateSuccess(data));
      });
    } catch (err) {
      dispatch(starUpdateErr(err));
    }
  };
};

const onCompleteUpdate = (data:any, id:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(completeUpdateBegin());

      data.map((item:any) => {
        if (item.id === id) {
          const complete = item;
          if (complete.completed) {
            item.completed = false;
          } else {
            complete.completed = true;
          }
        }
        return dispatch(completeUpdateSuccess(data));
      });
    } catch (err) {
      dispatch(completeUpdateErr(err));
    }
  };
};

const ontaskDelete = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(taskReadBegin());
      dispatch(taskReadSuccess(data));
    } catch (err) {
      dispatch(taskReadErr(err));
    }
  };
};

const ontaskEdit = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(taskReadBegin());
      dispatch(taskReadSuccess(data));
    } catch (err) {
      dispatch(taskReadErr(err));
    }
  };
};

export { taskAddData, onStarUpdate, ontaskDelete, onCompleteUpdate, ontaskEdit };
