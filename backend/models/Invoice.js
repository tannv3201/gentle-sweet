const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllInvoice = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM tbl_invoice");
    return rows;
};

const getAllInvoiceByStatus = async (status) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_invoice WHERE status = (?)",
        [status]
    );
    return rows;
};

const invoiceSearch = async (params) => {
    let query = "SELECT * FROM tbl_invoice WHERE 1=1";
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
        query += " AND created_at <= (?)";
        values.push(params.endDate);
    }

    if (params.customer_user_id) {
        query += " AND customer_user_id = (?)";
        values.push(params.customer_user_id);
    }

    const [rows, fields] = await pool.query(query, values)
    return rows;
};

const getAllInvoiceByDateToDate = async (date1, date2) => {
    let
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_invoice WHERE DATE(created_at) BETWEEN (?) AND (?)",
        [date1, date2]
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
    getAllInvoiceByStatus,
    invoiceSearch,
    createInvoice,
    updateInvoiceById,
    deleteInvoiceById,
    getInvoiceByCustomerUserId,
};
