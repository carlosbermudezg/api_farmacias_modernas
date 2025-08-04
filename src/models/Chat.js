const { pool } = require('../utils/connMySql2')

// Obtener mensajes con paginación por clave
const getMessages = async (userId, cursor, limit = 10) => {
    let query = `
      SELECT * FROM messages
      WHERE (sender_id = ? OR receiver_id = ?)
    `;
    const values = [userId, userId];
  
    if (cursor) {
      query += ' AND id < ?';
      values.push(cursor);
    }
  
    query += ' ORDER BY created_at DESC LIMIT ?';
    values.push(limit);
  
    const [rows] = await pool.query(query, values);
    return rows;
};  

// Crear nuevo mensaje
const createMessage = async ({ receiver_id, sender_id, content }) => {
    const [result] = await pool.query(
      'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
      [sender_id, receiver_id, content]
    );
  
    const [rows] = await pool.query(
      'SELECT * FROM messages WHERE id = ?',
      [result.insertId]
    );
  
    return rows[0];
};

async function createNotification(data) {
    const [result] = await pool.query(
      'INSERT INTO notifications (user_id, from_user_id, content) VALUES (?, ?, ?)',
      [data.user_id, data.from_user_id, data.content]
    );
  
    // Si querés devolver el objeto recién creado
    const [rows] = await pool.query(
      'SELECT * FROM notifications WHERE id = ?',
      [result.insertId]
    );
  
    return rows[0];
};

const getNotifications = async (user_id) => {
    const result = await pool.query(
      `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`,
      [user_id]
    );
    return result.rows;
};
  
  const markAsRead = async (notification_id) => {
    await pool.query(
      `UPDATE notifications SET is_read = TRUE WHERE id = $1`,
      [notification_id]
    );
};


module.exports = {
    getMessages,
    createMessage,
    createNotification,
    getNotifications,
    markAsRead
}