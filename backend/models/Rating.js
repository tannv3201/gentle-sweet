const pool = require("../config/database");

const getAllRating = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM tbl_rating");
    return rows;
};

const checkExistRating = async () => {
    const [rows, fields] = await pool.query(
        "SELECT *  FROM tbl_invoice INNER JOIN tbl_invoice_detail ON tbl_invoice.id = tbl_invoice_detail.invoice_id INNER JOIN tbl_rating ON tbl_invoice_detail.product_id = tbl_rating.product_id   WHERE tbl_rating.customer_user_id = ? AND tbl_rating.product_id = ? AND tbl_invoice.id = ?",
        [customer_user_id, product_id, tbl_invoice]
    );
    return rows[0];
};

const getRatingById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_rating WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const getAllRatingByInvoiceId = async (invoiceId) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_rating WHERE invoice_id= (?)",
        [invoiceId]
    );
    return rows;
};

const getAllRatingByBookingId = async (invoiceId) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_rating WHERE booking_id= (?)",
        [invoiceId]
    );
    return rows;
};

const getRatingByProductId = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT tbl_rating.*, tbl_customer_user.last_name, tbl_customer_user.first_name FROM tbl_rating INNER JOIN tbl_customer_user ON tbl_rating.customer_user_id = tbl_customer_user.id WHERE tbl_rating.product_id= (?)",
        [id]
    );
    return rows;
};

const getRatingByServiceId = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT tbl_rating.*, tbl_customer_user.last_name, tbl_customer_user.first_name FROM tbl_rating INNER JOIN tbl_customer_user ON tbl_rating.customer_user_id = tbl_customer_user.id WHERE tbl_rating.service_id= (?)",
        [id]
    );
    return rows;
};

const createRating = async (rating) => {
    const [result, fields] = await pool.query("INSERT INTO tbl_rating SET ?", [
        rating,
    ]);
    return result;
};

module.exports = {
    getAllRating,
    getRatingById,
    getRatingByProductId,
    createRating,
    getRatingByServiceId,
    checkExistRating,
    getAllRatingByInvoiceId,
    getAllRatingByBookingId,
};
