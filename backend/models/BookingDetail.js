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

const getBookingDetailByUser = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT bd.*, b.branch_id FROM tbl_booking_detail bd JOIN tbl_booking b ON bd.booking_id = b.id WHERE b.customer_user_id = (?)",
        [id]
    );
    return rows;
};

const getBookingTimeList = async (customer_user_id, date) => {
    const [rows, fields] = await pool.query(
        "SELECT b.*, bd.* FROM tbl_booking b INNER JOIN tbl_booking_detail bd ON b.id = bd.booking_id WHERE b.customer_user_id = ? AND bd.date = ? AND b.status <> 6 AND b.status <> 5",
        [customer_user_id, date]
    );
    return rows;
};

const getBookingDetailByBookingId = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT bd.*, sv.name AS service_name FROM tbl_booking_detail bd INNER JOIN tbl_service sv ON bd.service_id = sv.id WHERE booking_id = (?)",
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

const updatePriceTotalBooking = async (booking_id) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_booking AS b JOIN ( SELECT booking_id, SUM(unit_price) AS total FROM tbl_booking_detail WHERE booking_id = (?) GROUP BY booking_id ) AS bd ON b.id = bd.booking_id SET b.price_total = bd.total",
        [booking_id]
    );
    return result.affectedRows;
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
    getBookingTimeList,
    getBookingDetailByUser,
    createBookingDetail,
    updateBookingDetailById,
    deleteBookingDetailById,
    updatePriceTotalBooking,
    getBookingDetailByBookingId,
};
