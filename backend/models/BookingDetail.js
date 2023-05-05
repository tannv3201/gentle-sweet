const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllBookingDetail = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM tbl_booking_detail");
    return rows;
};

const getBookingDetailById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_booking_detail WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const getBookingDetailByBookingId = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_booking_detail WHERE booking_id= (?)",
        [id]
    );
    return rows;
};

const createBookingDetail = async (bookingDetail) => {
    const [result, fields] = await pool.query(
        "INSERT INTO tbl_booking_detail SET ?",
        [bookingDetail]
    );

    return result, bookingDetail;
};

const updateBookingDetailById = async (id, bookingDetail) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_booking_detail SET ? WHERE id = ?",
        [bookingDetail, id]
    );
    return result.affectedRows;
};

const deleteBookingDetailById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_booking_detail WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllBookingDetail,
    getBookingDetailById,
    createBookingDetail,
    updateBookingDetailById,
    deleteBookingDetailById,
    getBookingDetailByBookingId,
};
