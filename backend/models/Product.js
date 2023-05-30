const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllProduct = async () => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_product WHERE status > 0"
    );
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

const productSearch = async (params) => {
    let query = "SELECT * FROM tbl_product WHERE status > 0";
    const values = [];

    if (params.product_category_id) {
        query += " AND product_category_id = (?)";
        values.push(params.product_category_id);
    }

    if (params.min_price && params.max_price) {
        query += " AND price BETWEEN ? AND ?";
        values.push(params.min_price);
        values.push(params.max_price);
    } else if (params.min_price) {
        query += " AND price >= ?";
        values.push(params.min_price);
    }

    if (params.sort_by === "name_asc") {
        query += " ORDER BY name ASC";
    } else if (params.sort_by === "name_desc") {
        query += " ORDER BY name DESC";
    } else if (params.sort_by === "price_asc") {
        query += " ORDER BY price ASC";
    } else if (params.sort_by === "price_desc") {
        query += " ORDER BY price DESC";
    }

    if (params.limit) {
        query += " LIMIT ?";
        values.push(parseInt(params.limit));
    }

    const [rows, fields] = await pool.query(query, values);
    return rows;
};

module.exports = {
    productSearch,
    getAllProduct,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById,
};
