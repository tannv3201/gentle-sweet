const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllInvoice = async () => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_invoice WHERE status > 0"
    );
    return rows;
};

const getInvoiceById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_invoice WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const getInvoiceByCustomerUserId = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_invoice WHERE customer_user_id = (?)",
        [id]
    );
    return rows[0];
};

const createInvoice = async (invoice) => {
    const [result, fields] = await pool.query("INSERT INTO tbl_invoice SET ?", [
        invoice,
    ]);
    return result;
};

const updateInvoiceById = async (id, invoice) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_invoice SET ? WHERE id = ?",
        [invoice, id]
    );
    return result.affectedRows;
};

const deleteInvoiceById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_invoice WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllInvoice,
    getInvoiceById,
    createInvoice,
    updateInvoiceById,
    deleteInvoiceById,
    getInvoiceByCustomerUserId,
};
