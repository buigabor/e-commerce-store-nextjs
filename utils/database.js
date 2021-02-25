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
  return printers.map((p) => camelcaseKeys(p));
}

export async function getPrintersById(id) {
  const printers = await sql`SELECT * FROM printers WHERE id = ${id}`;
  return printers.map((p) => camelcaseKeys(p))[0];
}

export async function getAllPrintersIds() {
  const printers = await sql`SELECT id FROM printers`;
  return printers.map((p) => camelcaseKeys(p));
}

export async function deletePrinterById(id) {
  const printer = await sql`DELETE FROM printers WHERE id=${id}`;
  return camelcaseKeys(printer);
}

export async function updatePrinterById(id, printer) {
  const printerProperties = Object.keys(printer);

  if (printerProperties.length < 1) {
    return undefined;
  }

  let printers = [];

  if ('printingSize' in printer) {
    printers = await sql`
      UPDATE printers
        SET printing_size = ${printer.printingSize}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  if ('technology' in printer) {
    printers = await sql`
      UPDATE printers
        SET technology = ${printer.technology}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  if ('printingSpeed' in printer) {
    printers = await sql`
      UPDATE printers
        SET printing_speed = ${printer.printingSpeed}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  if ('fileFormat' in printer) {
    printers = await sql`
      UPDATE printers
        SET file_format = ${printer.fileFormat}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  if ('price' in printer) {
    printers = await sql`
      UPDATE printers
        SET price = ${printer.price}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  if ('description' in printer) {
    printers = await sql`
      UPDATE printers
        SET description = ${printer.description}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  if ('videoUrl' in printer) {
    printers = await sql`
      UPDATE printers
        SET video_url = ${printer.videoUrl}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  return printers.map((p) => camelcaseKeys(p))[0];
}

// MATERIALS TABLE

export async function getMaterials() {
  let materials = await sql`SELECT * FROM materials`;
  return materials.map((m) => camelcaseKeys(m));
}

export async function getMaterialsById(id) {
  const materials = await sql`SELECT * FROM materials WHERE id = ${id}`;
  return materials.map((m) => camelcaseKeys(m))[0];
}

export async function getAllmaterialsIds() {
  const materials = await sql`SELECT id FROM materials`;
  return materials.map((m) => camelcaseKeys(m));
}

export async function deleteMaterialById(id) {
  const material = await sql`DELETE FROM materials WHERE id=${id}`;
  return camelcaseKeys(material);
}

export async function updateMaterialById(id, material) {
  const materialProperties = Object.keys(material);

  if (materialProperties.length < 1) {
    return undefined;
  }

  let materials = [];

  if ('type' in material) {
    materials = await sql`
      UPDATE materials
        SET type = ${material.type}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  if ('price' in material) {
    materials = await sql`
      UPDATE materials
        SET price = ${material.price}
        WHERE id = ${id}
        RETURNING *;
    `;
  }

  return materials.map((m) => camelcaseKeys(m))[0];
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
  return currentUser.map((c) => camelcaseKeys(c))[0];
}

export async function getUserById(id) {
  const currentUser = await sql`SELECT * from users WHERE id=${id}`;
  return currentUser.map((c) => camelcaseKeys(c))[0];
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

export async function deleteSessionByToken(token) {
  await sql`
    DELETE FROM sessions WHERE token = ${token};
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
