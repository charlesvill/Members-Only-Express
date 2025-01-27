const pool = require("./pool.js");

async function selectUserbyUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  const user = rows[0];

  return user;
}

async function selectUserbyId(id) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
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


async function insertPost(username, text, timestamp){
  const user = await selectUserbyUsername(username);
  const userId = user.id;
  const query = `INSERT INTO posts (text, timestamp, user_id) VALUES ($1, $2, $3)`;
  await pool.query(query, [text, timestamp, userId]);
}

async function selectAllMessages(){
  const { rows } = await pool.query("SELECT * FROM posts");
  
  return rows;
}

module.exports = {
  selectUserbyUsername,
  selectUserbyId,
  insertNewUser,
  insertPost,
  selectAllMessages
};


