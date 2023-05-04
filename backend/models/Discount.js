const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllDiscount = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM tbl_discount");
    return rows;
};

const getDiscountById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_discount WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const createDiscount = async (discount) => {
    const [result, fields] = await pool.query(
        "INSERT INTO tbl_discount SET ?",
        [discount]
    );
    return result;
};

const updateDiscountById = async (id, discount) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_discount SET ? WHERE id = ?",
        [discount, id]
    );
    return result.affectedRows;
};

const deleteDiscountById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_discount WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllDiscount,
    getDiscountById,
    createDiscount,
    updateDiscountById,
    deleteDiscountById,
};
