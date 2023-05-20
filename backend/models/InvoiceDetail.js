const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllInvoiceDetail = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM tbl_invoice_detail");
    return rows;
};

const getInvoiceDetailById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_invoice_detail WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const getInvoiceDetailByInvoiceId = async (invoice_id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_invoice_detail WHERE invoice_id= (?)",
        [invoice_id]
    );
    return rows;
};

const createInvoiceDetail = async (invoiceDetail) => {
    const [result, fields] = await pool.query(
        "INSERT INTO tbl_invoice_detail SET ?",
        [invoiceDetail]
    );

    return result, invoiceDetail;
};

const updatePriceTotalInvoice = async (invoice_id) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_invoice AS i JOIN ( SELECT invoice_id, SUM(product_quantity * unit_price) AS total FROM tbl_invoice_detail WHERE invoice_id = (?) GROUP BY invoice_id ) AS d ON i.id = d.invoice_id SET i.price_total = d.total",
        [invoice_id]
    );
    return result.affectedRows;
};

const updateInvoiceDetailById = async (id, invoiceDetail) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_invoice_detail SET ? WHERE id = ?",
        [invoiceDetail, id]
    );
    return result.affectedRows;
};

const deleteInvoiceDetailById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_invoice_detail WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllInvoiceDetail,
    getInvoiceDetailById,
    createInvoiceDetail,
    updateInvoiceDetailById,
    deleteInvoiceDetailById,
    updatePriceTotalInvoice,
    getInvoiceDetailByInvoiceId,
};
