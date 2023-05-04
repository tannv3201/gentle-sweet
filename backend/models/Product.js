const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllProduct = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM tbl_product");
    return rows;
};

const getProductById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_product WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const createProduct = async (product) => {
    const [result, fields] = await pool.query("INSERT INTO tbl_product SET ?", [
        product,
    ]);
    return result;
};

const updateProductById = async (id, product) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_product SET ? WHERE id = ?",
        [product, id]
    );
    return result.affectedRows;
};

const deleteProductById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_product WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllProduct,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
};
