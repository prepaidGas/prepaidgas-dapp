import { AnyAction } from 'redux';

const actions = {
  CHANGE_LAYOUT_MODE_BEGIN: 'CHANGE_LAYOUT_MODE_BEGIN',
  CHANGE_LAYOUT_MODE_SUCCESS: 'CHANGE_LAYOUT_MODE_SUCCESS',
  CHANGE_LAYOUT_MODE_ERR: 'CHANGE_LAYOUT_MODE_ERR',

  CHANGE_RTL_MODE_BEGIN: 'CHANGE_RTL_MODE_BEGIN',
  CHANGE_RTL_MODE_SUCCESS: 'CHANGE_RTL_MODE_SUCCESS',
  CHANGE_RTL_MODE_ERR: 'CHANGE_RTL_MODE_ERR',

  CHANGE_MENU_MODE_BEGIN: 'CHANGE_MENU_MODE_BEGIN',
  CHANGE_MENU_MODE_SUCCESS: 'CHANGE_MENU_MODE_SUCCESS',
  CHANGE_MENU_MODE_ERR: 'CHANGE_MENU_MODE_ERR',

  CHANGE_MENU_COLLAPSE_BEGIN: 'CHANGE_MENU_COLLAPSE_BEGIN',
  CHANGE_MENU_COLLAPSE_SUCCESS: 'CHANGE_MENU_COLLAPSE_SUCCESS',
  CHANGE_MENU_COLLAPSE_ERR: 'CHANGE_MENU_COLLAPSE_ERR',

  CHANGE_MAIN_CONTENT_BEGIN: 'CHANGE_MAIN_CONTENT_BEGIN',
  CHANGE_MAIN_CONTENT_SUCCESS: 'CHANGE_MAIN_CONTENT_SUCCESS',
  CHANGE_MAIN_CONTENT_ERR: 'CHANGE_MAIN_CONTENT_ERR',

  changeLayoutBegin: (): AnyAction => {
    return {
      type: actions.CHANGE_LAYOUT_MODE_BEGIN,
    };
  },

  changeLayoutSuccess: (data:any): AnyAction => {
    return {
      type: actions.CHANGE_LAYOUT_MODE_SUCCESS,
      data,
    };
  },

  changeLayoutErr: (err:any): AnyAction => {
    return {
      type: actions.CHANGE_LAYOUT_MODE_ERR,
      err,
    };
  },

  changeRtlBegin: () => {
    return {
      type: actions.CHANGE_RTL_MODE_BEGIN,
    };
  },

  changeRtlSuccess: (data:any) => {
    return {
      type: actions.CHANGE_RTL_MODE_SUCCESS,
      data,
    };
  },

  changeRtlErr: (err:any) => {
    return {
      type: actions.CHANGE_RTL_MODE_ERR,
      err,
    };
  },

  changeMenuBegin: () => {
    return {
      type: actions.CHANGE_MENU_MODE_BEGIN,
    };
  },

  changeMenuSuccess: (data:any) => {
    return {
      type: actions.CHANGE_MENU_MODE_SUCCESS,
      data,
    };
  },

  changeMenuErr: (err:any) => {
    return {
      type: actions.CHANGE_MENU_MODE_ERR,
      err,
    };
  },

  collapseMenuBegin: () => {
    return {
      type: actions.CHANGE_MENU_COLLAPSE_BEGIN,
    };
  },

  collapseMenuSuccess: (data:any) => {
    return {
      type: actions.CHANGE_MENU_COLLAPSE_SUCCESS,
      data,
    };
  },

  collapseMenuErr: (err:any) => {
    return {
      type: actions.CHANGE_MENU_COLLAPSE_ERR,
      err,
    };
  },
};

export default actions;
