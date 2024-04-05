const actions = {
  SINGLE_CHAT_BEGIN: 'SINGLE_CHAT_BEGIN',
  SINGLE_CHAT_SUCCESS: 'SINGLE_CHAT_SUCCESS',
  SINGLE_CHAT_ERR: 'SINGLE_CHAT_ERR',

  SINGLE_GROUP_CHAT_BEGIN: 'SINGLE_GROUP_CHAT_BEGIN',
  SINGLE_GROUP_CHAT_SUCCESS: 'SINGLE_GROUP_CHAT_SUCCESS',
  SINGLE_GROUP_CHAT_ERR: 'SINGLE_GROUP_CHAT_ERR',

  UPDATE_GROUP_CHAT_BEGIN: 'UPDATE_GROUP_CHAT_BEGIN',
  UPDATE_GROUP_CHAT_SUCCESS: 'UPDATE_GROUP_CHAT_SUCCESS',
  UPDATE_GROUP_CHAT_ERR: 'UPDATE_GROUP_CHAT_ERR',

  UPDATE_PRIVET_CHAT_BEGIN: 'UPDATE_PRIVET_CHAT_BEGIN',
  UPDATE_PRIVET_CHAT_SUCCESS: 'UPDATE_PRIVET_CHAT_SUCCESS',
  UPDATE_PRIVET_CHAT_ERR: 'UPDATE_PRIVET_CHAT_ERR',

  singleChatBegin: () => {
    return {
      type: actions.SINGLE_CHAT_BEGIN,
    };
  },

  singleChatSuccess: (data:any) => {
    return {
      type: actions.SINGLE_CHAT_SUCCESS,
      data,
    };
  },

  singleChatErr: (err:any) => {
    return {
      type: actions.SINGLE_CHAT_ERR,
      err,
    };
  },

  singleGroupChatBegin: () => {
    return {
      type: actions.SINGLE_GROUP_CHAT_BEGIN,
    };
  },

  singleGroupChatSuccess: (data:any) => {
    return {
      type: actions.SINGLE_GROUP_CHAT_SUCCESS,
      data,
    };
  },

  singleGroupChatErr: (err:any) => {
    return {
      type: actions.SINGLE_GROUP_CHAT_ERR,
      err,
    };
  },

  updateGroupChatBegin: () => {
    return {
      type: actions.UPDATE_GROUP_CHAT_BEGIN,
    };
  },

  updateGroupChatSuccess: (data:any) => {
    return {
      type: actions.UPDATE_GROUP_CHAT_SUCCESS,
      data,
    };
  },

  updateGroupChatErr: (err:any) => {
    return {
      type: actions.UPDATE_GROUP_CHAT_ERR,
      err,
    };
  },

  updatePrivetChatBegin: () => {
    return {
      type: actions.UPDATE_PRIVET_CHAT_BEGIN,
    };
  },

  updatePrivetChatSuccess: (data:any) => {
    return {
      type: actions.UPDATE_PRIVET_CHAT_SUCCESS,
      data,
    };
  },

  updatePrivetChatErr: (err:any) => {
    return {
      type: actions.UPDATE_PRIVET_CHAT_ERR,
      err,
    };
  },
};

export default actions;
