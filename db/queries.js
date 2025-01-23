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

module.exports = {
  selectUserbyUsername,
  selectUserbyId
};


