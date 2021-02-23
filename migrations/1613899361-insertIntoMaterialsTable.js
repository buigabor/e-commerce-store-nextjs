const materials = [
  { id: 'm-1', name: 'PLA 3D Printer Filament', type: 'Filament', price: 15 },
  { id: 'm-2', name: 'SINTERIT POWDER', type: 'Powder', price: 250 },
  { id: 'm-3', name: 'ANYCUBIC 3D Printer Resin', type: 'Liquid', price: 40 },
  { id: 'm-4', name: 'ELEGOO 3D Rapid Resin', type: 'Liquid', price: 30 },
  { id: 'm-5', name: 'iSANMATE Wood Filament', type: 'Filament', price: 35 },
  { id: 'm-6', name: 'Rich OPTO Water Washable ', type: 'Liquid', price: 32 },
  { id: 'm-7', name: 'Sinterit PA12', type: 'Powder', price: 160 },
];

exports.up = async (sql) => {
  await sql`
  INSERT INTO materials ${sql(materials, 'id', 'name', 'type', 'price')}
  `;
};

exports.down = async (sql) => {
  for (const material of materials) {
    await sql`
  	DELETE FROM materials WHERE name=${material.name} AND type=${material.type} AND price=${material.price}
  	`;
  }
};
