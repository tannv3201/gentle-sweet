const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllProductCategory = async () => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_product_categories"
    );
    return rows;
};

const getProductCategoryById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_product_categories WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const createProductCategory = async (productCategory) => {
    const [result, fields] = await pool.query(
        "INSERT INTO tbl_product_categories SET ?",
        [productCategory]
    );
    return result;
};

const updateProductCategoryById = async (id, productCategory) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_product_categories SET ? WHERE id = ?",
        [productCategory, id]
    );
    return result.affectedRows;
};

const deleteProductCategoryById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_product_categories WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllProductCategory,
    getProductCategoryById,
    createProductCategory,
    updateProductCategoryById,
    deleteProductCategoryById,
};
