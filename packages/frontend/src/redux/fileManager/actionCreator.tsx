/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import actions from './actions';
import initialState from '../../demoData/fileManager.json';

const { fmDataBegin, fmDataSuccess, fmDataErr, fmDataReceivedBegin, fmDataReceivedSuccess, fmDataReceivedErr } =
  actions;

const fmGetData = () => {
  return async (dispatch:any) => {
    try {
      dispatch(fmDataBegin());
      dispatch(fmDataSuccess(initialState));
    } catch (err) {
      dispatch(fmDataErr(err));
    }
  };
};

const Folder = (folders:any, paths:any) => {
  return folders.map((item:any) => {
    if (item.path === paths) {
      item.className = item.className === 'active' ? '' : 'active';
    }
    return item.folder.length && SubFolder(item.folder, paths);
  });
};

const SubFolder = (folders:any, paths:any) => {
  return folders.map((item:any) => {
    if (item.path === paths) {
      item.className = item.className === 'active' ? '' : 'active';
    }
    return item.folder.length && Folder(item.folder, paths);
  });
};

const fmAddActiveClass = (paths:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(fmDataBegin());
      initialState.map((value:any) => {
        if (value.path === paths) {
          value.className = value.className === 'active' ? '' : 'active';
        }
        return value.folder.length && Folder(value.folder, paths);
      });

      dispatch(fmDataSuccess(initialState));
    } catch (err) {
      dispatch(fmDataErr(err));
    }
  };
};

const DeleteFolder = (folders:any, paths:any) => {
  return folders.map((item:any, key:any) => {
    if (item.path === paths) {
      folders.delete(key);
      // return (item.name = 'hello World');
    }
    return item.folder.length && DeleteSubFolder(item.folder, paths);
  });
};

const DeleteSubFolder = (folders:any, paths:any) => {
  return folders.map((item:any) => {
    if (item.path === paths) {
      item.className = item.className === 'active' ? '' : 'active';
    }
    return item.folder.length && DeleteFolder(item.folder, paths);
  });
};

const deleteAddActiveClass = (paths:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(fmDataBegin());
      initialState.map((value:any) => {
        if (value.path === paths) {
          value.className = value.className === 'active' ? '' : 'active';
        }
        return value.folder.length && DeleteFolder(value.folder, paths);
      });

      dispatch(fmDataSuccess(initialState));
    } catch (err) {
      dispatch(fmDataErr(err));
    }
  };
};

const GetFolderData = (folders:any, paths:any, dispatch:any) => {
  return folders.filter((item:any) => {
    if (item.path === paths) {
      return dispatch(fmDataReceivedSuccess([item]));
    }
    return item.folder.length && GetSubFolderData(item.folder, paths, dispatch);
  });
};

const GetSubFolderData = (folders:any, paths:any, dispatch:any) => {
  return folders.filter((item:any) => {
    if (item.path === paths) {
      return dispatch(fmDataReceivedSuccess([item]));
    }
    return item.folder.length && Folder(item.folder, paths);
  });
};

const fmReadAllFileFolder = (paths:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(fmDataReceivedBegin());
      return initialState.filter((value:any) => {
        if (value.path === paths) {
          return dispatch(fmDataReceivedSuccess([value]));
        }
        return value.folder.length && GetFolderData(value.folder, paths, dispatch);
      });
    } catch (err) {
      dispatch(fmDataReceivedErr(err));
    }
  };
};

export { fmGetData, fmAddActiveClass, fmReadAllFileFolder, deleteAddActiveClass };
