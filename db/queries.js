const pool = require("./pool.js");

async function selectUserbyUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  const user = rows[0];

  return user;
}

async function selectUserbyId(id) {
  const { rows } = pool.query("SELECT * FROM users WHERE id = $1", [id]);
  const user = rows[0];

  return user;
}

async function insertNewUser(...params) {

  const query = `
      INSERT INTO users (
        username, firstname, lastname, membership, admin, hash
      )  VALUES ($1, $2, $3, $4, $5, $6)
      `;
  await pool.query(query, [...params]);
}


module.exports = {
  selectUserbyUsername,
  selectUserbyId,
  insertNewUser
};


