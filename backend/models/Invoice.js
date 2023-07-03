const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

// const getAllInvoice = async () => {
//     const [rows, fields] = await pool.query(
//         "SELECT iv.*, cus.last_name, cus.first_name FROM tbl_invoice iv INNER JOIN tbl_customer_user cus ON iv.customer_user_id = cus.id"
//     );
//     return rows;
// };

const getAllInvoice = async () => {
    const [rows, fields] = await pool.query(
        "SELECT tbl_invoice.*, tbl_customer_user.last_name, tbl_customer_user.first_name FROM tbl_invoice INNER JOIN tbl_customer_user ON tbl_invoice.customer_user_id = tbl_customer_user.id"
    );
    return rows;
};

const getAllInvoiceByStatus = async (status) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_invoice WHERE status = (?)",
        [status]
    );
    return rows;
};

const getProductInvoiceCancel = async (invoiceId) => {
    const [rows, fields] = await pool.query(
        "SELECT tbl_product.id, tbl_product.quantity, tbl_invoice_detail.product_quantity as quantityPurchased FROM tbl_invoice INNER JOIN tbl_invoice_detail ON tbl_invoice.id = tbl_invoice_detail.invoice_id INNER JOIN tbl_product ON tbl_invoice_detail.product_id = tbl_product.id WHERE tbl_invoice.id = (?)",
        [invoiceId]
    );
    return rows;
};

const invoiceSearch = async (params) => {
    let query =
        "SELECT tbl_invoice.*, tbl_customer_user.last_name, tbl_customer_user.first_name FROM tbl_invoice INNER JOIN tbl_customer_user ON tbl_invoice.customer_user_id = tbl_customer_user.id WHERE 1=1";
    const values = [];

    if (params.status) {
        query += " AND tbl_invoice.status = (?)";
        values.push(params.status);
    }

    if (params.startDate) {
        query += " AND tbl_invoice.created_at >= (?)";
        values.push(params.startDate);
    }

    if (params.endDate) {
        const endDate = new Date(params.endDate);
        endDate.setDate(endDate.getDate() + 1);

        query += " AND tbl_invoice.created_at < (?)";
        values.push(endDate);
    }

    if (params.customer_user_id) {
        query += " AND tbl_invoice.customer_user_id = (?)";
        values.push(params.customer_user_id);
    }

    const [rows, fields] = await pool.query(query, values);
    return rows;
};

const getInvoiceById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT cu.first_name, cu.last_name, i.* FROM tbl_customer_user cu JOIN tbl_invoice i ON cu.id = i.customer_user_id WHERE i.id = (?)",
        [id]
    );
    return rows[0];
};

const getInvoiceByCustomerUserId = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_invoice WHERE customer_user_id = (?)",
        [id]
    );
    return rows;
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
    getProductInvoiceCancel,
    getAllInvoiceByStatus,
    invoiceSearch,
    createInvoice,
    updateInvoiceById,
    deleteInvoiceById,
    getInvoiceByCustomerUserId,
};
