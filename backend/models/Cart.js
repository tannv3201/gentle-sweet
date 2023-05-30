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
        "SELECT * FROM tbl_cart WHERE customer_user_id = (?)",
        [id]
    );
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
    getCartById,
    createCart,
    updateCartById,
    deleteCartById,
    getCartByCustomerUserId,
};