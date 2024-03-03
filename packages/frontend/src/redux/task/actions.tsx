const actions = {
  TASK_READ_BEGIN: 'TASK_READ_BEGIN',
  TASK_READ_SUCCESS: 'TASK_READ_SUCCESS',
  TASK_READ_ERR: 'TASK_READ_ERR',

  TASK_STAR_UPDATE_BEGIN: 'TASK_STAR_UPDATE_BEGIN',
  TASK_STAR_UPDATE_SUCCESS: 'TASK_STAR_UPDATE_SUCCESS',
  TASK_STAR_UPDATE_ERR: 'TASK_STAR_UPDATE_ERR',

  TASK_COMPLETE_UPDATE_BEGIN: 'TASK_COMPLETE_UPDATE_BEGIN',
  TASK_COMPLETE_UPDATE_SUCCESS: 'TASK_COMPLETE_UPDATE_SUCCESS',
  TASK_COMPLETE_UPDATE_ERR: 'TASK_COMPLETE_UPDATE_ERR',

  TASK_DELETE_BEGIN: 'TASK_COMPLETE_UPDATE_BEGIN',
  TASK_DELETE_SUCCESS: 'TASK_COMPLETE_UPDATE_SUCCESS',
  TASK_DELETE_ERR: 'TASK_COMPLETE_UPDATE_ERR',

  starUpdateBegin: () => {
    return {
      type: actions.TASK_STAR_UPDATE_BEGIN,
    };
  },

  starUpdateSuccess: (data:any) => {
    return {
      type: actions.TASK_STAR_UPDATE_SUCCESS,
      data,
    };
  },

  starUpdateErr: (err:any) => {
    return {
      type: actions.TASK_STAR_UPDATE_ERR,
      err,
    };
  },
  completeUpdateBegin: () => {
    return {
      type: actions.TASK_STAR_UPDATE_BEGIN,
    };
  },

  completeUpdateSuccess: (data:any) => {
    return {
      type: actions.TASK_STAR_UPDATE_SUCCESS,
      data,
    };
  },

  completeUpdateErr: (err:any) => {
    return {
      type: actions.TASK_STAR_UPDATE_ERR,
      err,
    };
  },
  taskReadBegin: () => {
    return {
      type: actions.TASK_READ_BEGIN,
    };
  },

  taskReadSuccess: (data:any) => {
    return {
      type: actions.TASK_READ_SUCCESS,
      data,
    };
  },

  taskReadErr: (err:any) => {
    return {
      type: actions.TASK_READ_ERR,
      err,
    };
  },
  taskDeleteBegin: () => {
    return {
      type: actions.TASK_DELETE_BEGIN,
    };
  },

  taskDeleteSuccess: (data:any) => {
    return {
      type: actions.TASK_DELETE_SUCCESS,
      data,
    };
  },

  taskDeleteErr: (err:any) => {
    return {
      type: actions.TASK_DELETE_ERR,
      err,
    };
  },
};

export default actions;
