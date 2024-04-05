import actions from './actions';
import staticData from '../../config/config';

const initialState = {
  isLoggedIn: staticData.loggedIn,
};

const {
  LOGIN_BEGIN,
  LOGIN_SUCCESS,
  LOGIN_ERR,

} = actions;

const themeUsersReducer = (state = initialState, action:any) => {
  const { type, data, err } = action;
  switch (type) {
    case LOGIN_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: data,
        loading: false,
      };
    case LOGIN_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default themeUsersReducer;
