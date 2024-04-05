import actions from './actions';

const {
  changeLayoutBegin,
  changeLayoutSuccess,
  changeLayoutErr,

  changeRtlBegin,
  changeRtlSuccess,
  changeRtlErr,

  changeMenuBegin,
  changeMenuSuccess,
  changeMenuErr,

  collapseMenuBegin,
  collapseMenuSuccess,
  collapseMenuErr,
} = actions;

const changeLayoutMode = (value:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(changeLayoutBegin());
      dispatch(changeLayoutSuccess(value));
    } catch (err) {
      dispatch(changeLayoutErr(err));
    }
  };
};

const changeDirectionMode = (value:any) => {
  return async (dispatch: any) => {
    try {
      dispatch(changeRtlBegin());
      dispatch(changeRtlSuccess(value));
    } catch (err) {
      dispatch(changeRtlErr(err));
    }
  };
};

const changeMenuMode = (value:any) => {
  return (dispatch: any) => {
    try {
      dispatch(changeMenuBegin());
      dispatch(changeMenuSuccess(value));
    } catch (err) {
      dispatch(changeMenuErr(err));
    }
  };
};

const changeMenuCollapse = (value:any) => {
  return (dispatch: any) => {
    try {
      dispatch(collapseMenuBegin());
      dispatch(collapseMenuSuccess(value));
    } catch (err) {
      dispatch(collapseMenuErr(err));
    }
  };
};

export { changeLayoutMode, changeDirectionMode, changeMenuMode, changeMenuCollapse };
