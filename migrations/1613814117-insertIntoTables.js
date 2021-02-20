const test = [{ name: 'test' }, { name: 'test2' }];

const printersData = [
  {
    name: 'Original Prusa i3',
    technology: 'FDM',
    printing_speed: '180mm/s',
    file_format: 'STL',
    img_url: null,
    price: 770,
    description:
      'The Original Prusa I3 MK3S+ is the successor of the award-winning Original Prusa i3 MK2 3D printer. With the rebuilt extruder, a plethora of sensors and the new magnetic MK52 heatbed with replaceable PEI spring steel print sheet we believe that we have developed our best 3D printer yet!',
    compatible_material: '{Metal, PA, Wood,TPU}',
    printing_size: '250mm x 320mm x 250mm',
    video_url: 'https://www.youtube.com/watch?v=a6elq83OVWQ',
  },
  {
    name: 'Polaroid Playsmart 3D',
    technology: 'FDM',
    printing_speed: '140mm/s',
    file_format: 'STL',
    img_url: null,
    price: 370,
    description:
      '3.5 inch full colour LCD touch screen, which includes one-click instant print, the ability to view video playback of previously printed models, as well as simple step-by-step instructions to enhance user experience Heated glass print bed, allowing you to print with multiple materials and remove models effortlessly, post-print. Multiple ways to send your model to print via SD Card, USB, Mobile App (Wi-Fi).',
    compatible_material: '{Metal,ABS, Polyethylene Terephthalate Glycol}',
    printing_size: '250mm x 300mm x 280mm',
    video_url: 'https://www.youtube.com/watch?v=Uh74HSJKtZs',
  },
  {
    name: 'ANYCUBIC Mega S 3D',
    technology: 'FDM',
    printing_speed: '100mm/s',
    file_format: 'STL',
    img_url: null,
    price: 320,
    description:
      'Fast Assembly, Mega X 3D printer came in two modules and all it takes is to plug in 12 screws and 3 cables, easy to assemble and get printing right out of the box, Perfect choice for beginners and veteran. High Print Precision, This 3D Printer’s print precision is greatly improved by equipping it with Y Axis Dual Sideway Design and Z-axis dual screw rod design, The pitting in the skin and texture in the clothing all can shows up',
    compatible_material: '{Metal, PA}',
    printing_size: '310mm x 320mm x 300mm',
    video_url: 'https://www.youtube.com/watch?v=B4Kp1nXagLg',
  },
  {
    name: 'QIDI TECH 3D Printer',
    technology: 'SLS',
    printing_speed: '150mm/s',
    file_format: 'STL',
    img_url: null,
    price: 990,
    description:
      'The X-PLUS with pioneered creation of two different ways for placing the filament. Ventilative printing or enclosed constant temperature printing for you to choose when printing the different types of filament. The X-PLUS 3D Printer Kit comes with two different types of extruder assembly. The extruder A had already been installed on the printer. The max printing temperature is 250C, and it can works well with PLA, ABS, TPU. And for extruder B, free to you if you need. The maximum printing temperature is 300C, and can print Nylon, Carbon Fiber, PC. (The latest development, free trial).',
    compatible_material: '{ABS, PA, Nylon, Carbon, PC}',
    printing_size: '270mm x 200mm x 200mm',
    video_url: 'https://www.youtube.com/watch?v=_l5S1r5E01s',
  },
  {
    name: 'ANYCUBIC Photon Mono',
    technology: 'SLA',
    printing_speed: '150mm/s',
    file_format: 'STL',
    img_url: null,
    price: 300,
    description:
      '2.5X Faster Resin 3D Printer,ANYCUBIC Photon Mono 3D Printers printing speed is 2.5X faster than the regular 3d printers, rapid prototyping greatly improved printing efficiency and saved more time, comes with a 6.08 2K Monochrome LCD and only takes 1.5 seconds per layer exposure to cure resin, whose service life is 4 times that of RGB LCD screen, save material and costs High Accuracy and Strong Stability, ANYCUBIC Photon Mono LCD screen Adopts matrix parallel light source 15 pcs lamp beads, is able to carry out uniform exposure, improve the quality of models, Z-axis guide rail structure and stepper motor have better stability, with an accuracy of 0.01mm, it effectively eliminating layer patterns, Its a great 3D printer for printing games, movies, cartoon characters, miniatures, etc.',
    compatible_material: '{Resin}',
    printing_size: '250mm x 370mm x 280mm',
    video_url: 'https://www.youtube.com/watch?v=kPRj6BI2B80',
  },
  {
    name: 'Creality Ender 3 Pro 3D',
    technology: 'FDM',
    printing_speed: '140mm/s',
    file_format: 'STL',
    img_url: null,
    price: 280,
    description:
      'REMOVABLE BUILD SURFACE PLATE: Provide all-round protection to your 3D printer build plate and ensure consistent temperature throughout the build surface. Easy to remove the printing models after cooling. SAFE POWER SUPPLY: Ender 3 Pro comes with a UL Certified power supply, protecting your printer from unexpected power surges, that can heat the hot bed to 110℃ in just 5 minutes.RESUME PRINT FUNCTION: Ender 3 Pro can resume printing from the last recorded extruder position after suffering unexpected power outages. SEMI-ASSEMBLED KIT: This easy-to-setup kit comes partially assembled, allowing you to learn about the basic construction of 3D printers as you finish putting it together. A fun STEM educational experience in mechanical engineering and electronics.',
    compatible_material: '{PA}',
    printing_size: '250mm x 280mm x 250mm',
    video_url: 'https://www.youtube.com/watch?v=a8Z-9ncYsps',
  },
  {
    name: 'QIDI TECH Large',
    technology: 'SLS',
    printing_speed: '160mm/s',
    file_format: 'STL',
    img_url: null,
    price: 1200,
    description:
      'The X-Max with pioneered creation of two different ways for placing the filament. Ventilative printing or enclosed constant temperature printing for you to choose when printing the different types of filament. 5-inch full color touchscreen with intuitive icons makes for easy operation Full metal support more stable than plastic support;Aviation aluminum, CNC machining aluminum alloy QIDI TECH Professional Amazon after-service team,if you have any problem about our 3d printer,we will reply to you within 24 hours.Free one-year warranty. ',
    compatible_material: '{Acrylic, ABS, PA, TPU}',
    printing_size: '250mm x 280mm x 250mm',
    video_url: 'https://www.youtube.com/watch?v=_l5S1r5E01s',
  },
  {
    name: 'Dremel Digilab 3D20',
    technology: 'Polyjet',
    printing_speed: '130mm/s',
    file_format: 'STL',
    img_url: null,
    price: 640,
    description:
      'Countless hours of high quality printing with the most reliable low-cost 3D printer Quickly and easily make your 1st print out of the box with completely pre-assembled printer, included 0.5 kilogram spool of filament and clear setup instructions. Maximum build depth (inches): 9 Far superior safety compared to competition with fully enclosed design, non-heated build plate, PLA-only printing and 3rd party UL safety approval. Compatible with brand new Dremel Digilab 3D Slicer based on cura, the industry leading open source 3D printing software and gcode files so you can use your favorite slicer',
    compatible_material: '{PA}',
    printing_size: '265mm x 300mm x 250mm',
    video_url: 'https://www.youtube.com/watch?v=UK6tG5gWdjA',
  },
  {
    name: 'TENLOG TL-D3 Pro',
    technology: 'FDM',
    printing_speed: '120mm/s',
    file_format: 'STL',
    img_url: null,
    price: 600,
    description:
      'Independent Dual Extruder Design】Our TL-D3 Pro dual extruder 3D printer has dual nozzles independent of each other, so you can print in dual material/duplication/mirror mode. With dual material printing mode, you can get two color models. Choose duplication or mirror mode, you can get two models of the same color or different colors. 【Upgrade Borosilicate Glass Bed】TENLOG upgrade borosilicate glass bed enable prints adhere better without the warping.ultra smoothness even on the first layer,the model can be Pick up by hand after cooling.【Self-developed Silent Motherboard 】The TL-D3 Pro built-in self-developed silent motherboard tmc2208 driver, which has stronger anti-interference, faster and more stable motion performance, silent printing and low decibel operation.',
    compatible_material: '{ABS, PA, Wood, PA, TPU}',
    printing_size: '270mm x 310mm x 350mm',
    video_url: 'https://www.youtube.com/watch?v=Xn4wdZlDj9w',
  },
  {
    name: 'JGAURORA 3D Printers A8',
    technology: 'FDM',
    printing_speed: '165mm/s',
    file_format: 'STL',
    img_url: null,
    price: 2200,
    description:
      'Reliable Material : Commercial grade 3d printer industrial linear guildway precise ball screw rods.metal structure with cover Large building size :13.78x9.8x11.8in ,lots of printing material ABS PLA TPU WOOD filament 1.75mm Clean and neat structure :Fully closed metal structure with creative and friendly metal extruder cover ,precise CNC components Easy Filament Feeding :Dual feeding motor,filament feeding auto and easily HBG glass heating bed tigh adhesion easy to take off when cooling down',
    compatible_material: '{Metal, PA, ABS, Wood, TPU}',
    printing_size: '380mm x 390mm x 350mm',
    video_url: 'https://www.youtube.com/watch?v=j-MoLQA6q_E',
  },
  {
    name: 'ELEGOO Mars 2 Pro',
    technology: 'SLA',
    printing_speed: '155mm/s',
    file_format: 'STL',
    img_url: null,
    price: 300,
    description:
      '【Fast Printing and less maintenance】Mars 2 Pro comes with a 6.08 inch monochrome LCD of 2K HD resolution and only takes 2 seconds per layer exposure to cure resin, which could significantly enhance your printing efficiency. Mono LCD has a much longer lifespan and stable performance during long term printing, thus saves your cost.【Outstanding prints and ultra accuracy】Brand new light source structure provides more even UV light emission and working together with 2K mono LCD, the printing details and precision are greatly improved and the 3D printed models are fascinating. 【Sturdy build quality】CNC machined aluminum body makes Mars 2 Pro a very formidable machine. Newly-designed sandblasted build plate has a much stronger adherence during printing and enables consistent printing success. Built-in active carbon could absorb the fume of resin and offer you a refreshing printing experience.【Multi language interface】Mars 2 Pro now supports 12 kinds of languages so customers across the world could operate the 3D printer more conveniently without barriers. The newly added 10 languages are Japanese, Dutch, Korean, French, German, Russian, Italian, Spanish, Turkish and Portuguese.',
    compatible_material: '{Resin}',
    printing_size: '250mm x 280mm x 250mm',
    video_url: 'https://www.youtube.com/watch?v=0yZ4KiK_pl0',
  },
  {
    name: 'WEEDO F152S 3D',
    technology: 'FDM',
    printing_speed: '150mm/s',
    file_format: 'STL',
    img_url: null,
    price: 600,
    description:
      '【【Quick Slicing Software】F152S is equipped with the latest version of our slicing software Wiibuilder, which brings a brand-new experience to users. Faster loading and slicing (60M moonlight model loading time 10S, 40S to complete slicing. Accurate prediction of print time and consumed printing material etc.) The software supports multiple material types (PLA / PETG / ABS / PC / NYLON). Developed new seam concealment technology to make your print surface smoother. 【Silent and Healthy】 F152S adopts four-door open and fully enclosed design concept. The main control board is equipped with TMC2208 driver controllers, which makes the printing process silent. F152S uses a 0.08mm air filter module to block the fine particles generated by 3D printing to protect the health of you and your family. 【Smart and Convenient】F152S does not require assembly and uses a wizard interface after booting which helps beginners to use the printer. With a 4.3-inch full-color touch screen, automatic leveling, filament runout detection, and power resumption functions, this takes the worry out of printing. Automatic shutdown after printing makes printing more energy-efficient and environmentally friendly.【Multiple Print Modes】F152S is equipped with a WIFI module, so you can control the printer through an APP (PoloPrint Pro) and supports Wiibuilder software so you can send sliced files for printing with one click.',
    compatible_material: '{ABS, PA, Nylon, TPU, PC, Metal}',
    printing_size: '250mm x 300mm x 280mm',
    video_url: 'https://www.youtube.com/watch?v=GoY7nLpap8Y',
  },
  {
    name: 'Sindoh 3D1AQ 3DWOX',
    technology: 'SLS',
    printing_speed: '140mm/s',
    file_format: 'STL',
    img_url: null,
    price: 1150,
    description:
      '✅ ​Open Source Filament Mode is available letting users to have access to using 3rd party filaments. ✅ ​Easy to use and setup with patented features such as the Assisted Bed Leveling and Filament Auto-loading. ✅ ​Offers Flexible Metal Bed Plate for easy bed adhesion and user safety. No more adhesives to increase adhesion or scrapers to remove objects! ✅ ​Includes HEPA filter (Commonly used in air purifiers) to arrest very fine particles produced during print effectively. ✅ ​Reduced sound level of 40db which is equivalent to a library noise level. Print through the night without being disturbed by the sound of printing. ✅ ​Nozzle Diameter 0. 4mm Max Build size (WxDxH) 210 x 200 x 195mm (8. 2”x7. 9”x7. 7”)',
    compatible_material: '{ABS, Metal, PA}',
    printing_size: '350mm x 340mm x 300mm',
    video_url: 'https://www.youtube.com/watch?v=bo8pQmKgwgw',
  },
];

const materials = [
  { name: 'Metal' },
  { name: 'Wood' },
  { name: 'ABS' },
  { name: 'TPU' },
];

const printer_combatible_materials_data = [
  { printer_id: 1, compatible_material_id: 1 },
  { printer_id: 1, compatible_material_id: 2 },
  { printer_id: 2, compatible_material_id: 1 },
  { printer_id: 2, compatible_material_id: 2 },
];

exports.up = async (sql) => {
  await sql`
  INSERT INTO all_materials ${sql(materials, 'name')}
  `;

  await sql`
  INSERT INTO printers ${sql(
    printersData,
    'name',
    'technology',
    'printing_speed',
    'file_format',
    'img_url',
    'price',
    'description',
    // 'compatible_material',
    'printing_size',
    'video_url',
  )}
  `;

  await sql`
  INSERT INTO printer_compatible_materials ${sql(
    printer_combatible_materials_data,
    'printer_id',
    'compatible_material_id',
  )}
  `;
};

exports.down = async (sql) => {
  // await sql`
  // ALTER TABLE printer_combatible_materials
  // DROP COLUMN printer_id;
  // `;
  // await sql`
  // ALTER TABLE printer_combatible_materials
  // DROP COLUMN compatible_material_id;
  // `;
  for (const el of printer_combatible_materials_data) {
    console.log(el);
    await sql`
  	DELETE FROM printer_compatible_materials WHERE printer_id=${el.printer_id} AND compatible_material_id=${el.compatible_material_id}
  	`;
  }

  for (const printer of printersData) {
    await sql`
  	DELETE FROM printers WHERE name=${printer.name} AND technology=${printer.technology} AND printing_speed=${printer.printing_speed} AND file_format=${printer.file_format} AND img_url=${printer.img_url} AND price=${printer.price} AND description=${printer.description} AND printing_size=${printer.printing_size} AND video_url=${printer.video_url}
  	`;
  }
  for (const material of materials) {
    await sql`
  	DELETE FROM all_materials WHERE name=${material.name}
  	`;
  }

  // await sql`
  // 	DELETE FROM printer_compatible_materials WHERE printer_id=1 AND compatible_material_id=1
  // 	`;
  // await sql`
  // 	DELETE FROM printer_compatible_materials WHERE printer_id=1 AND compatible_material_id=2
  // 	`;
  // await sql`
  // 	DELETE FROM printer_compatible_materials WHERE printer_id=2 AND compatible_material_id=1
  // 	`;
  // AND compatible_material=${printer.compatible_material}
};
