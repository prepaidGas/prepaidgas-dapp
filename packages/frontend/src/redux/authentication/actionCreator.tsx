import Cookies from 'js-cookie';
import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const logInAction = (callback:any) => {
  return async (dispatch:any) => {
    dispatch(loginBegin());
    try {
      Cookies.set('access_token', 'access_token');
      Cookies.set('loggedIn', true.toString());
      dispatch(loginSuccess(true));
      callback();
    } catch (err) {
      dispatch(loginErr(err));
    }
    // try {
    //   const response = await DataService.post('/login');
    //   console.log('Response: ' + response);
    //   if (response.data.errors) {
    //     dispatch(loginErr(response.data.errors));
    //   } else {
    //     console.log('Success: ' + response.data.data.token);
    //     Cookies.set('access_token', response.data.data.token);
    //     Cookies.set('loggedIn', true.toString());
    //     dispatch(loginSuccess(true));
    //     callback();
    //   }
    // } catch (err) {
    //   dispatch(loginErr(err));
    // }
  };
};

const registerAction = (callback:any) => {
  return async (dispatch:any) => {
    dispatch(loginBegin());
    try {
      Cookies.set('access_token', 'access_token');
      Cookies.set('loggedIn', true.toString());
      dispatch(loginSuccess(true));
      callback();
    } catch (err) {
      dispatch(loginErr(err));
    }

    // try {
    //   const response = await DataService.post('/register', values);
    //   if (response.data.errors) {
    //     dispatch(loginErr('Registration failed!'));
    //   } else {
    //     dispatch(loginSuccess(false));
    //   }
    // } catch (err) {
    //   dispatch(loginErr(err));
    // }
  };
};

const logOutAction = (callback:any) => {
  return async (dispatch:any) => {
    dispatch(logoutBegin());
    try {
      Cookies.remove('loggedIn');
      Cookies.remove('access_token');
      dispatch(logoutSuccess(false));
      callback();
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { logInAction, logOutAction, registerAction };
