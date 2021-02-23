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

// PRINTERS TABLE

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

// MATERIALS TABLE

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

// USERS TABLE

export async function saveUser({ username, password, email }) {
  await sql`INSERT INTO users (username, password, email) VALUES(${username},${password}, ${email})`;
}

export async function getUserByName(username) {
  const currentUser = await sql`SELECT * from users WHERE username=${username}`;
  return currentUser[0];
}

// SESSIONS TABLE

export async function getSessionByToken(token) {
  const sessions = await sql`
    SELECT * FROM sessions WHERE token = ${token};
  `;

  return sessions.map((s) => camelcaseKeys(s))[0];
}

export async function insertSession(token, userId) {
  await sql`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING *;
  `;
}

export async function deleteExpiredSessions() {
  await sql`
    DELETE FROM sessions WHERE expiry_timestamp < NOW();
  `;
}

// GET ALL PRINTERS WITH MATCHED COMPATIBLE MATERIALS

export async function getAllPrintersWithCompatibleMaterials() {
  // Get printers from PG database
  let printersFetched = await getPrinters();

  // Remove last 2 elements (count and SELECT)
  printersFetched.splice(printersFetched.length - 2, 2);

  // Insert compatibleMaterial property inside each printer
  let printers = await Promise.all(
    printersFetched.map(async (printer) => {
      return {
        ...printer,
        compatibleMaterial: await getCompatibleMatsById(printer.id),
      };
    }),
  );

  // Get all the name of mats
  let printersWithCompatibleMats = printers.map((printer) => {
    return {
      ...printer,
      compatibleMaterial: printer.compatibleMaterial?.map((mat) => mat.name),
    };
  });

  return printersWithCompatibleMats;
}
