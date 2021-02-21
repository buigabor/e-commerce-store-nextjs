exports.up = async (sql) => {
  await sql`CREATE TABLE materials (
    id character varying(20),
    name character varying(50) NOT NULL,
    type character varying(50) NOT NULL,
		price numeric NOT NULL
)`;
};

exports.down = async (sql) => {
  await sql`DROP TABLE materials`;
};
