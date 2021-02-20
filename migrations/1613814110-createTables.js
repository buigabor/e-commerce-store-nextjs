exports.up = async (sql) => {
  await sql`CREATE TABLE printers (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name character varying(50) NOT NULL,
    technology character varying(30) NOT NULL,
    printing_speed character varying(15) NOT NULL,
    file_format character varying(10) NOT NULL,
    img_url text,
    price numeric NOT NULL,
    description text NOT NULL,
    -- compatible_material text[] NOT NULL,
    printing_size character varying(50) NOT NULL,
    video_url text
)`;
  await sql`CREATE TABLE all_materials (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		name character varying(50) NOT NULL
	)`;

  await sql`CREATE TABLE printer_compatible_materials (
    -- id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		printer_id INT NOT NULL REFERENCES printers (id),
		compatible_material_id INT NOT NULL REFERENCES all_materials (id),
		PRIMARY KEY(printer_id,compatible_material_id)
	)`;
};

exports.down = async (sql) => {
  await sql`DROP TABLE printer_compatible_materials`;
  await sql`DROP TABLE printers`;
  await sql`DROP TABLE all_materials`;
};
