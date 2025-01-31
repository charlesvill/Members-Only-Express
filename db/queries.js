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


async function insertPost(userid, text){
  const query = `INSERT INTO posts (text, timestamp, user_id) VALUES ($1, NOW(), $2)`;
  await pool.query(query, [text, userid]);
}

async function selectAllMessages(){
  const { rows } = await pool.query("SELECT posts.id, users.id AS user_id, text, timestamp, username, membership, admin FROM posts JOIN users ON posts.user_id = users.id");
  
  return rows;
}

async function updateMembership(id, member, admin){
  const query = `UPDATE users SET membership = $1, admin = $2 WHERE id = $3`;

  await pool.query(query, [member, admin, id]);
}

async function deletePost(id) {
  await pool.query(`DELETE FROM posts WHERE id = $1`,[id]);
}

module.exports = {
  selectUserbyUsername,
  selectUserbyId,
  insertNewUser,
  insertPost,
  selectAllMessages,
  updateMembership,
  deletePost
};


