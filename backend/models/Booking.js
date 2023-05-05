const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllBooking = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM tbl_booking");
    return rows;
};

const getBookingById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_booking WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const getBookingByCustomerUserId = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_booking WHERE customer_user_id = (?)",
        [id]
    );
    return rows[0];
};

const createBooking = async (booking) => {
    const [result, fields] = await pool.query("INSERT INTO tbl_booking SET ?", [
        booking,
    ]);
    return booking;
};

const updateBookingById = async (id, booking) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_booking SET ? WHERE id = ?",
        [booking, id]
    );
    return result.affectedRows;
};

const deleteBookingById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_booking WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllBooking,
    getBookingById,
    createBooking,
    updateBookingById,
    deleteBookingById,
    getBookingByCustomerUserId,
};
