import actions from './actions';

const { loginBegin, loginSuccess, loginErr } = actions;

const loginMode = (value:boolean) => {
  return async (dispatch:any) => {
    try {
      dispatch(loginBegin());
      dispatch(loginSuccess(value));
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

export { loginMode };
