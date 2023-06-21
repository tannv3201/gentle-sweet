const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllCart = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM tbl_cart");
    return rows;
};

const getCartById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_cart WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const getCartByCustomerUserId = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT c.id, c.product_id, p.name AS product_name, c.product_quantity, p.image_url, p.price AS product_price, p.price_onsale AS product_price_onsale FROM tbl_cart c JOIN tbl_product p ON c.product_id = p.id WHERE c.customer_user_id = (?)",
        [id]
    );
    return rows;
};

const cartSearch = async (params) => {
    let query = "SELECT * FROM tbl_cart WHERE status > 0";
    const values = [];

    if (params.product_id) {
        query += " AND product_id = (?)";
        values.push(params.product_id);
    }

    if (params.customer_user_id) {
        query += " AND customer_user_id = (?)";
        values.push(params.customer_user_id);
    }

    const [rows, fields] = await pool.query(query, values);
    return rows;
};

const createCart = async (cart) => {
    const [result, fields] = await pool.query("INSERT INTO tbl_cart SET ?", [
        cart,
    ]);
    return result;
};

const updateCartById = async (id, cart) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_cart SET ? WHERE id = ?",
        [cart, id]
    );
    return result.affectedRows;
};

const deleteCartById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_cart WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllCart,
    cartSearch,
    getCartById,
    createCart,
    updateCartById,
    deleteCartById,
    getCartByCustomerUserId,
};
