import { AnyAction } from 'redux';

const actions = {
  LOGIN_BEGIN: 'LOGIN_BEGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERR: 'LOGIN_ERR',

  loginBegin: (): AnyAction => {
    return {
      type: actions.LOGIN_BEGIN,
    };
  },

  loginSuccess: (data:any): AnyAction => {
    return {
      type: actions.LOGIN_SUCCESS,
      data,
    };
  },

  loginErr: (err:any): AnyAction => {
    return {
      type: actions.LOGIN_ERR,
      err,
    };
  },
};

export default actions;
