const actions = {
  NOTE_READ_BEGIN: 'NOTE_READ_BEGIN',
  NOTE_READ_SUCCESS: 'NOTE_READ_SUCCESS',
  NOTE_READ_ERR: 'NOTE_READ_ERR',

  NOTE_STAR_UPDATE_BEGIN: 'NOTE_STAR_UPDATE_BEGIN',
  NOTE_STAR_UPDATE_SUCCESS: 'NOTE_STAR_UPDATE_SUCCESS',
  NOTE_STAR_UPDATE_ERR: 'NOTE_STAR_UPDATE_ERR',

  NOTE_LABEL_UPDATE_BEGIN: 'NOTE_LABEL_UPDATE_BEGIN',
  NOTE_LABEL_UPDATE_SUCCESS: 'NOTE_LABEL_UPDATE_SUCCESS',
  NOTE_LABEL_UPDATE_ERR: 'NOTE_LABEL_UPDATE_ERR',

  starUpdateBegin: () => {
    return {
      type: actions.NOTE_STAR_UPDATE_BEGIN,
    };
  },

  starUpdateSuccess: (data:any) => {
    return {
      type: actions.NOTE_STAR_UPDATE_SUCCESS,
      data,
    };
  },

  starUpdateErr: (err:any) => {
    return {
      type: actions.NOTE_STAR_UPDATE_ERR,
      err,
    };
  },

  labelUpdateBegin: () => {
    return {
      type: actions.NOTE_LABEL_UPDATE_BEGIN,
    };
  },

  labelUpdateSuccess: (data:any) => {
    return {
      type: actions.NOTE_LABEL_UPDATE_SUCCESS,
      data,
    };
  },

  labelUpdateErr: (err:any) => {
    return {
      type: actions.NOTE_LABEL_UPDATE_ERR,
      err,
    };
  },

  noteReadBegin: () => {
    return {
      type: actions.NOTE_READ_BEGIN,
    };
  },

  noteReadSuccess: (data:any) => {
    return {
      type: actions.NOTE_READ_SUCCESS,
      data,
    };
  },

  noteReadErr: (err:any) => {
    return {
      type: actions.NOTE_READ_ERR,
      err,
    };
  },
};

export default actions;
