import actions from './actions';

const {
  toAddBoardReadBegin,
  toAddBoardSuccess,
  toAddBoardReadErr,
  toAddTaskBegin,
  toAddTaskSuccess,
  toAddTaskErr,
  toDeleteTaskBegin,
  toDeleteTaskSuccess,
  toDeletedTaskErr
} = actions;

const ToAddBoard = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(toAddBoardReadBegin());
      dispatch(toAddBoardSuccess(data));
    } catch (err) {
      dispatch(toAddBoardReadErr(err));
    }
  };
};

const ToAddTask = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(toAddTaskBegin());
      dispatch(toAddTaskSuccess(data));
    } catch (err) {
      dispatch(toAddTaskErr(err));
    }
  };
};

const ToDeleteTask = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(toDeleteTaskBegin());
      dispatch(toDeleteTaskSuccess(data));
    } catch (err) {
      dispatch(toDeletedTaskErr(err));
    }
  };
};

export { ToAddBoard, ToAddTask, ToDeleteTask };
