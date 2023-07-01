const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllBooking = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM tbl_booking");
    return rows;
};

const bookingSearch = async (params) => {
    let query = "SELECT * FROM tbl_booking WHERE 1=1";
    const values = [];

    if (params.status) {
        query += " AND status = (?)";
        values.push(params.status);
    }

    if (params.startDate) {
        query += " AND created_at >= (?)";
        values.push(params.startDate);
    }

    if (params.endDate) {
        const endDate = new Date(params.endDate);
        endDate.setDate(endDate.getDate() + 1);

        query += " AND created_at < (?)";
        values.push(endDate);
    }

    if (params.customer_user_id) {
        query += " AND customer_user_id = (?)";
        values.push(params.customer_user_id);
    }

    if (params.branch_id) {
        query += " AND branch_id = (?)";
        values.push(params.branch_id);
    }

    if (params.booking_time) {
        query += " AND booking_time = (?)";
        values.push(params.booking_time);
    }

    const [rows, fields] = await pool.query(query, values);
    return rows;
};

const getBookingById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT cu.first_name, cu.phone_number, cu.detail_address AS customer_detail_address, cu.province AS customer_province, cu.district AS customer_district, cu.ward AS customer_ward, cu.last_name, cu.email AS customer_email , b.* FROM tbl_customer_user cu JOIN tbl_booking b ON cu.id = b.customer_user_id WHERE b.id = (?)",
        [id]
    );
    return rows[0];
};

const getBookingByCustomerUserId = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_booking WHERE customer_user_id = (?)",
        [id]
    );
    return rows;
};

const createBooking = async (booking) => {
    const [result, fields] = await pool.query("INSERT INTO tbl_booking SET ?", [
        booking,
    ]);
    return result;
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
    bookingSearch,
    createBooking,
    updateBookingById,
    deleteBookingById,
    getBookingByCustomerUserId,
};
