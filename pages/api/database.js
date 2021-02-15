import camelcaseKeys from 'camelcase-keys';
// import { createRequire } from 'module';
import postgres from 'postgres';
// const require = createRequire(import.meta.url);
require('dotenv-safe').config();

const sql = postgres();

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
