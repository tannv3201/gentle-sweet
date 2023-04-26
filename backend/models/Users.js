const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllUsers = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM tbl_users");
    return rows;
};

const getUserById = async (userId) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_users WHERE id= (?)",
        [userId]
    );
    return rows[0];
};

const findUserByUsername = async (username) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_users WHERE username= (?)",
        [username]
    );
    return rows[0];
};

const createUser = async (userData) => {
    const [result, fields] = await pool.query("INSERT INTO tbl_users SET ?", [
        userData,
    ]);
    return result;
};

const updateUserById = async (userId, userData) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_users SET ? WHERE id = ?",
        [userData, userId]
    );
    return result.affectedRows;
};

const deleteUserById = async (userId) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_users WHERE id = ?",
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
    findUserByUsername,
};
