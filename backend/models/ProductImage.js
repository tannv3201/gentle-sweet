const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllProductImage = async () => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_product_image WHERE status > 0"
    );
    return rows;
};

const getProductImageById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_product_image WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const getProductImageByProductId = async (product_id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_product_image WHERE product_id = (?)",
        [product_id]
    );
    return rows;
};

const createProductImage = async (productImage) => {
    const [result, fields] = await pool.query(
        "INSERT INTO tbl_product_image SET ?",
        [productImage]
    );
    return result;
};

const updateProductImageById = async (id, productImage) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_product_image SET ? WHERE id = ?",
        [productImage, id]
    );
    return result.affectedRows;
};

const deleteProductImageById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_product_image WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllProductImage,
    getProductImageById,
    getProductImageByProductId,
    createProductImage,
    updateProductImageById,
    deleteProductImageById,
};
