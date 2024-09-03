const db = require("../db");

const User = {
  create: async (username, email, password) => {
    try {
      const [result] = await db.query(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, password]
      );
      return result.insertId;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  findByEmail: async (email) => {
    try {
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw error;
    }
  },

  findById: async (id) => {
    try {
      const [rows] = await db.query(
        "SELECT id, username, email FROM users WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      console.error("Error finding user by id:", error);
      throw error;
    }
  },

  update: async (id, username) => {
    try {
      const [result] = await db.query(
        "UPDATE users SET username = ? WHERE id = ?",
        [username, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  updatePassword: async (id, password) => {
    try {
      const [result] = await db.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [password, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  checkExists: async (username, email) => {
    try {
      const [rows] = await db.query(
        "SELECT COUNT(*) as count FROM users WHERE username = ? OR email = ?",
        [username, email]
      );
      return rows[0].count > 0;
    } catch (error) {
      console.error("Error checking user existence:", error);
      throw error;
    }
  },
};

module.exports = User;
// const db = require('../db');

// class User {
//   static async create(username, email, password) {
//     const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id';
//     const values = [username, email, password];
//     const { rows } = await db.query(query, values);
//     return rows[0].id;
//   }

//   static async findByEmail(email) {
//     const query = 'SELECT * FROM users WHERE email = $1';
//     const { rows } = await db.query(query, [email]);
//     return rows[0];
//   }

//   static async updatePassword(userId, newPassword) {
//     const query = 'UPDATE users SET password = $1 WHERE id = $2';
//     await db.query(query, [newPassword, userId]);
//   }

//   static async updateResetToken(userId, resetToken, resetTokenExpiry) {
//     const query = 'UPDATE users SET reset_token = $1, reset_token_expiry = $2 WHERE id = $3';
//     await db.query(query, [resetToken, resetTokenExpiry, userId]);
//   }

//   static async findByResetToken(resetToken) {
//     const query = 'SELECT * FROM users WHERE reset_token = $1';
//     const { rows } = await db.query(query, [resetToken]);
//     return rows[0];
//   }

//   static async clearResetToken(userId) {
//     const query = 'UPDATE users SET reset_token = NULL, reset_token_expiry = NULL WHERE id = $1';
//     await db.query(query, [userId]);
//   }
// }

// module.exports = User;