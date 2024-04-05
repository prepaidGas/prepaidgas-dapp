import actions from './actions';
import initialState from '../../demoData/message-list.json';

const { readMessageBegin, readMessageSuccess, readMessageErr } = actions;

const readMessageList = () => {
  return async (dispatch:any) => {
    try {
      dispatch(readMessageBegin());
      dispatch(readMessageSuccess(initialState));
    } catch (err) {
      dispatch(readMessageErr(err));
    }
  };
};

export { readMessageList };
