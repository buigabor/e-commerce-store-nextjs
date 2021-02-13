import * as types from '../types';

export const fetchProducts = () => async (dispatch) => {
  dispatch({
    type: types.GET_PRODUCTS,
    payload: [
      {
        name: 'Original Prusa i3 MK3S',
        technology: 'FDM',
        printingSpeed: '180mm/s',
        fileFormat: 'STL',
        application: 'medical, architectural, home',
        imgUrl:
          'https://cdn.shop.prusa3d.com/1303-thickbox_default/original-prusa-i3-mk3s-kit.jpg',
        price: '770€',
        description:
          "The Original Prusa I3 MK3S+ is the successor of the award-winning Original Prusa i3 MK2 3D printer. With the rebuilt extruder, a plethora of sensors and the new magnetic MK52 heatbed with replaceable PEI spring steel print sheet we believe that we've developed our best 3D printer yet!",
        compatibleMaterial:
          'Metal , Acrylonitrile Butadiene Styrene , Polyethylene Terephthalate Glycol , Polylactic Acid , Wood , Thermoplastic Polyurethane',
        printingSize: '250mm x 320mm x 250mm',
      },
      {
        name: 'Polaroid PlaySmart 3D-Drucker PL-1001-00',
        technology: 'FDM',
        printingSpeed: '140mm/s',
        fileFormat: 'STL',
        application: 'architectural, home',
        imgUrl:
          'https://images-na.ssl-images-amazon.com/images/I/41qFs5nw8JL._AC_.jpg',
        price: '370€',
        compatibleMaterial:
          'Metal , Acrylonitrile Butadiene Styrene , Polyethylene Terephthalate Glycol , Polylactic Acid , Wood , Thermoplastic Polyurethane',
        printingSize: '250mm x 300mm x 280mm',
        description:
          '3.5 inch full colour LCD touch screen, which includes one-click instant print, the ability to view video playback of previously printed models, as well as simple step-by-step instructions to enhance user experience Heated glass print bed, allowing you to print with multiple materials and remove models effortlessly, post-print. Multiple ways to send your model to print via SD Card, USB, Mobile App (Wi-Fi).',
      },
      {
        name: 'ANYCUBIC Mega S 3D',
        technology: 'FDM',
        printingSpeed: '90mm/s',
        fileFormat: 'STL',
        application: 'medical, architectural, home',
        imgUrl:
          'https://images-na.ssl-images-amazon.com/images/I/71gUhesFJ3L._SL1500_.jpg',
        price: '320€',
        compatibleMaterial: 'Metal , Polylactic Acid',
        printingSize: '310mm x 320mm x 300mm',
        description:
          'Fast Assembly, Mega X 3D printer came in two modules and all it takes is to plug in 12 screws and 3 cables, easy to assemble and get printing right out of the box, Perfect choice for beginners and veteran. High Print Precision, This 3D Printer’s print precision is greatly improved by equipping it with Y Axis Dual Sideway Design and Z-axis dual screw rod design, The pitting in the skin and texture in the clothing all can shows up',
      },
      {
        name: 'QIDI TECH 3D Printer',
        technology: 'SLS',
        printingSpeed: '160mm/s',
        fileFormat: 'STL',
        application: 'medical, architectural, home',
        imgUrl:
          'https://images-na.ssl-images-amazon.com/images/I/61c6MGq6AjL._SL1000_.jpg',
        price: '990€',
        compatibleMaterial:
          'Acrylonitrile Butadiene Styrene , Polylactic Acid , Nylon , Thermoplastic Polyurethane , Carbon Fiber , Polycarbonate',
        printingSize: '270mm x 200mm x 200mm',
        description:
          'The X-PLUS with pioneered creation of two different ways for placing the filament. Ventilative printing or enclosed constant temperature printing for you to choose when printing the different types of filament. The X-PLUS 3D Printer Kit comes with two different types of extruder assembly. The extruder A had already been installed on the printer. The max printing temperature is 250C, and it can works well with PLA, ABS, TPU. And for extruder B, free to you if you need. The maximum printing temperature is 300C, and can print Nylon, Carbon Fiber, PC. (The latest development, free trial).',
      },
    ],
  });
};
