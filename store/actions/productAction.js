import * as types from '../types';

export const fetchProducts = () => async (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTS,
    payload: [
      {
        name: '3D Printer 1',
        technology: 'FDM',
        printingSpeed: '180mm/s',
        fileFormat: 'STL',
        application: 'medical, architectural, home',
      },
      {
        name: '3D Printer 2',
        technology: 'SLS',
        printingSpeed: '180mm/s',
        fileFormat: 'STL',
        application: 'medical, architectural, home',
      },
      {
        name: '3D Printer 3',
        technology: 'SLA',
        printingSpeed: '180mm/s',
        fileFormat: 'STL',
        application: 'medical, architectural, home',
      },
      {
        name: '3D Printer 4',
        technology: 'FDM',
        printingSpeed: '180mm/s',
        fileFormat: 'STL',
        application: 'medical, architectural, home',
      },
    ],
  });
};
