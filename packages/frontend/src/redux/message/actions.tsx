const actions = {
  READ_MESSAGE_BEGIN: 'READ_MESSAGE_BEGIN',
  READ_MESSAGE_SUCCESS: 'READ_MESSAGE_SUCCESS',
  READ_MESSAGE_ERR: 'READ_MESSAGE_ERR',

  readMessageBegin: () => {
    return {
      type: actions.READ_MESSAGE_BEGIN,
    };
  },

  readMessageSuccess: (data:any) => {
    return {
      type: actions.READ_MESSAGE_SUCCESS,
      data,
    };
  },

  readMessageErr: (err:any) => {
    return {
      type: actions.READ_MESSAGE_ERR,
      err,
    };
  },
};

export default actions;
