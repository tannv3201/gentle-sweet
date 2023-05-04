const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM tbl_admin_user");
    return rows;
};

const getUserById = async (userId) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_admin_user WHERE id= (?)",
        [userId]
    );
    return rows[0];
};

const getUserByAccountId = async (accountId) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_admin_user WHERE account_id= (?)",
        [accountId]
    );
    return rows[0];
};

const createUser = async (userData) => {
    const [result, fields] = await pool.query(
        "INSERT INTO tbl_admin_user SET ?",
        [userData]
    );
    return result, userData;
};

const updateUserById = async (userId, userData) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_admin_user SET ? WHERE id = ?",
        [userData, userId]
    );
    return result.affectedRows;
};

const deleteUserById = async (userId) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_admin_user WHERE id = ?",
        [userId]
    );
    return result.affectedRows;
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    getUserByAccountId,
};
