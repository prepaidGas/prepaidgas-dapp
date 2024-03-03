import actions from './actions';
import initialState from '@/demoData/note.json';

const {
  noteReadBegin,
  noteReadSuccess,
  noteReadErr,
  starUpdateBegin,
  starUpdateSuccess,
  starUpdateErr,
  labelUpdateBegin,
  labelUpdateSuccess,
  labelUpdateErr,
} = actions;

const noteDragData = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(labelUpdateBegin());
      dispatch(labelUpdateSuccess(data));
    } catch (err) {
      dispatch(labelUpdateErr(err));
    }
  };
};

const noteGetData = () => {
  return async (dispatch:any) => {
    try {
      dispatch(noteReadBegin());
      dispatch(noteReadSuccess(initialState));
    } catch (err) {
      dispatch(noteReadErr(err));
    }
  };
};

const noteAddData = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(noteReadBegin());
      dispatch(noteReadSuccess(data));
    } catch (err) {
      dispatch(noteReadErr(err));
    }
  };
};

const noteDeleteData = (data:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(noteReadBegin());
      dispatch(noteReadSuccess(data));
    } catch (err) {
      dispatch(noteReadErr(err));
    }
  };
};

const onStarUpdate = (data:any, id:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(starUpdateBegin());
      data.map((item:any) => {
        if (item.key === id) {
          const fav = item;
          if (item.stared) {
            fav.stared = false;
          } else {
            fav.stared = true;
          }
        }
        return dispatch(starUpdateSuccess(data));
      });
    } catch (err) {
      dispatch(starUpdateErr(err));
    }
  };
};

const onLabelUpdate = (data:any, id:any, value:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(labelUpdateBegin());
      data.map((item:any) => {
        if (item.key === id) {
          const fav = item;
          fav.label = value;
        }
        return dispatch(labelUpdateSuccess(data));
      });
    } catch (err) {
      dispatch(labelUpdateErr(err));
    }
  };
};

const onLabelFilter = (label:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(labelUpdateBegin());
      const data = initialState.filter((item) => {
        return label === 'all' ? initialState : label === 'favorite' ? item.stared : item.label === label;
      });

      dispatch(labelUpdateSuccess(data));
    } catch (err) {
      dispatch(labelUpdateErr(err));
    }
  };
};

export { noteGetData, noteAddData, noteDeleteData, onStarUpdate, onLabelUpdate, onLabelFilter, noteDragData };
