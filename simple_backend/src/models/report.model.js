const db = require('../config/database');

class Report {
  static async getTopUsers(limit){
    // pake window function RANK() buat nentuin peringkatnya
    const query = `
      SELECT 
        u.id, u.name, u.username, u.email, u.phone, u.balance,
        SUM(t.total) AS "total spent",
        RANK() OVER (ORDER BY SUM(t.total) DESC) AS rank
      FROM users u
      JOIN transactions t ON u.id = t.user_id
      WHERE t.status = 'paid'
      GROUP BY u.id
      LIMIT $1
    `;
    const result = await db.query(query, [limit]);
    return result.rows;
  }

  static async getItemsSold(){
    // pake JOIN sama agregasi SUM buat ngitung total revenue dan quantity
    const query = `
      SELECT 
        i.id, i.name, i.price, i.stock,
        SUM(t.quantity) AS total_quantity_sold,
        SUM(t.total) AS "total revenue"
      FROM items i
      JOIN transactions t ON i.id = t.item_id
      WHERE t.status = 'paid'
      GROUP BY i.id
    `;
    const result = await db.query(query);
    return result.rows;
  }

  static async getMonthlySales(year){
    // pake date_trunc buat ngelompokin bulan trus pake GROUP BY
    const query = `
      SELECT 
        date_trunc('month', created_at) AS month,
        COUNT(*) AS "transaction count",
        SUM(total) AS "total revenue"
      FROM transactions
      WHERE status = 'paid' AND EXTRACT(YEAR FROM created_at) = $1
      GROUP BY month
      ORDER BY month
    `;
    const result = await db.query(query, [year]);
    return result.rows;
  }
}

module.exports = Report;