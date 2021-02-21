import camelcaseKeys from 'camelcase-keys';
// import { createRequire } from 'module';
import postgres from 'postgres';
// const require = createRequire(import.meta.url);
require('dotenv-safe').config();

function connectOneTimeToDB() {
  let sql;
  if (process.env.NODE_ENV === 'production') {
    sql = postgres({ ssl: true });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }
  return sql;
}

// Connect To PostgreSQL

const sql = connectOneTimeToDB();

// PRINTERS

export async function getPrinters() {
  const printers = await sql`SELECT * FROM printers`;
  return camelcaseKeys(printers);
}

export async function getPrintersById(id) {
  const printers = await sql`SELECT * FROM printers WHERE id = ${id}`;
  return camelcaseKeys(printers[0]);
}

export async function getAllPrintersIds() {
  const printers = await sql`SELECT id FROM printers`;
  return camelcaseKeys(printers);
}

// MATERIALS

export async function getMaterials() {
  const materials = await sql`SELECT * FROM materials`;
  return camelcaseKeys(materials);
}

export async function getMaterialsById(id) {
  const materials = await sql`SELECT * FROM materials WHERE id = ${id}`;
  return camelcaseKeys(materials[0]);
}

export async function getAllmaterialsIds() {
  const materials = await sql`SELECT id FROM materials`;
  return camelcaseKeys(materials);
}

// GET COMPATIBLE MATERIALS FROM JUNCTION TABLE

export async function getCompatibleMatsById(id) {
  const materials = await sql` SELECT all_materials.name
   FROM printer_compatible_materials
     JOIN printers ON printers.id = printer_compatible_materials.printer_id
     JOIN all_materials ON printer_compatible_materials.compatible_material_id = all_materials.id
  WHERE printers.id = ${id};`;
  return materials;
}
