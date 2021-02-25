exports.up = async (sql) => {
  await sql`CREATE TABLE users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		username character varying(100) NOT NULL,
		password text NOT NULL,
		email character varying(300) NOT NULL,
		admin BOOLEAN DEFAULT FALSE
	)`;
};

exports.down = async (sql) => {
  await sql`DROP TABLE users`;
};
