const Report = require('../models/report.model');

class ReportController {
  // TODO: Implementasi endpoint laporan dengan query SQL kompleks
  static async getTopUsers(req, res, next) {
    try{
      // GET /reports/top-users?limit=10
      // Query: ranking pengguna berdasarkan total pengeluaran (gunakan window function RANK())
      const limit = parseInt(req.query.limit) || 10;
      const users = await Report.getTopUsers(limit);
      res.status(200).json({
        success: true,
        message: 'Top users retrieved successfully',
        payload: users,
      });
    }catch (error){
      next(error);
    }
  }

  static async getItemsSold(req, res, next) {
    try{
      // GET /reports/items-sold
      // Query: total quantity terjual dan total pendapatan per item (gunakan JOIN dan SUM)
      const items = await Report.getItemsSold();
      res.status(200).json({
        success: true,
        message: 'Items sold retrieved successfully',
        payload: items,
      });
    }catch (error){
      next(error);
    }
  }

  static async getMonthlySales(req, res, next) {
    try{
      // GET /reports/monthly-sales?year=2026
      // Query: ringkasan penjualan bulanan (gunakan date_trunc dan GROUP BY)
      const year = parseInt(req.query.year) || 2026;
      const sales = await Report.getMonthlySales(year);
      res.status(200).json({
        success: true,
        message: 'Monthly sales retrieved successfully',
        payload: sales
      });
    }catch (error){
      next(error);
    }
  }
}

module.exports = ReportController;