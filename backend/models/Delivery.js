const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllDelivery = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM tbl_delivery");
    return rows;
};

const getDeliveryById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_delivery WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const getDeliveryByUserId = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_delivery WHERE customer_user_id = (?)",
        [id]
    );
    return rows;
};

const getDeliveryByInvoiceId = async (invoiceId) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_delivery WHERE invoice_id= (?)",
        [invoiceId]
    );
    return rows[0];
};

const createDelivery = async (delivery) => {
    const [result, fields] = await pool.query(
        "INSERT INTO tbl_delivery SET ?",
        [delivery]
    );
    return result;
};

const updateDeliveryById = async (id, delivery) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_delivery SET ? WHERE id = ?",
        [delivery, id]
    );
    return result.affectedRows;
};

const deleteDeliveryById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_delivery WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllDelivery,
    getDeliveryById,
    getDeliveryByInvoiceId,
    getDeliveryByUserId,
    createDelivery,
    updateDeliveryById,
    deleteDeliveryById,
};
