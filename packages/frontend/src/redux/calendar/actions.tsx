const actions = {
  CALENDAR_READ_BEGIN: 'CALENDAR_READ_BEGIN',
  CALENDAR_READ_SUCCESS: 'CALENDAR_READ_SUCCESS',
  CALENDAR_READ_ERR: 'CALENDAR_READ_ERR',

  EVENT_VISIBLE_BEGIN: 'EVENT_VISIBLE_BEGIN',
  EVENT_VISIBLE_SUCCESS: 'EVENT_VISIBLE_SUCCESS',
  EVENT_VISIBLE_ERR: 'EVENT_VISIBLE_ERR',

  CALENDAR_STAR_UPDATE_BEGIN: 'CALENDAR_STAR_UPDATE_BEGIN',
  CALENDAR_STAR_UPDATE_SUCCESS: 'CALENDAR_STAR_UPDATE_SUCCESS',
  CALENDAR_STAR_UPDATE_ERR: 'CALENDAR_STAR_UPDATE_ERR',

  CALENDAR_LABEL_UPDATE_BEGIN: 'CALENDAR_LABEL_UPDATE_BEGIN',
  CALENDAR_LABEL_UPDATE_SUCCESS: 'CALENDAR_LABEL_UPDATE_SUCCESS',
  CALENDAR_LABEL_UPDATE_ERR: 'CALENDAR_LABEL_UPDATE_ERR',

  starUpdateBegin: () => {
    return {
      type: actions.CALENDAR_STAR_UPDATE_BEGIN,
    };
  },

  starUpdateSuccess: (data:any) => {
    return {
      type: actions.CALENDAR_STAR_UPDATE_SUCCESS,
      data,
    };
  },

  starUpdateErr: (err:any) => {
    return {
      type: actions.CALENDAR_STAR_UPDATE_ERR,
      err,
    };
  },

  eventVisibleBegin: () => {
    return {
      type: actions.EVENT_VISIBLE_BEGIN,
    };
  },

  eventVisibleSuccess: (data:any) => {
    return {
      type: actions.EVENT_VISIBLE_SUCCESS,
      data,
    };
  },

  eventVisibleErr: (err:any) => {
    return {
      type: actions.EVENT_VISIBLE_ERR,
      err,
    };
  },

  labelUpdateBegin: () => {
    return {
      type: actions.CALENDAR_LABEL_UPDATE_BEGIN,
    };
  },

  labelUpdateSuccess: (data:any) => {
    return {
      type: actions.CALENDAR_LABEL_UPDATE_SUCCESS,
      data,
    };
  },

  labelUpdateErr: (err:any) => {
    return {
      type: actions.CALENDAR_LABEL_UPDATE_ERR,
      err,
    };
  },

  calendarReadBegin: () => {
    return {
      type: actions.CALENDAR_READ_BEGIN,
    };
  },

  calendarReadSuccess: (data:any) => {
    return {
      type: actions.CALENDAR_READ_SUCCESS,
      data,
    };
  },

  calendarReadErr: (err:any) => {
    return {
      type: actions.CALENDAR_READ_ERR,
      err,
    };
  },
};

export default actions;
