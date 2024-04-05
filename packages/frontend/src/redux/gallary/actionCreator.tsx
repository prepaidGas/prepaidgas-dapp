import actions from './actions';
import initialState from '../../demoData/gallery.json';

const { filterGalleryBegin, filterGallerySuccess, filterGalleryErr } = actions;

const galleryFilter = (column:any, value:any) => {
  return async (dispatch:any) => {
    try {
      dispatch(filterGalleryBegin());
      setTimeout(() => {
        const data = initialState.filter((item:any) => {
          if (value !== '') {
            return item[column] === value;
          }
          return item;
        });
        dispatch(filterGallerySuccess(data));
      }, 500);
    } catch (err) {
      dispatch(filterGalleryErr(err));
    }
  };
};

export { galleryFilter };
