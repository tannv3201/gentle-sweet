const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllAdminUser = async (status) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_admin_user WHERE status > (?) AND role_id <> 'dec1fab2-1489-438d-b60b-fe192a6b444a'",
        [status]
    );
    return rows;
};

const getAdminUserById = async (adminUserId) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_admin_user WHERE id= (?)",
        [adminUserId]
    );
    return rows[0];
};

const findAdminUserByUsername = async (username) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_admin_user WHERE username= (?)",
        [username]
    );
    return rows[0];
};

const createAdminUser = async (adminUserData) => {
    try {
        const [result, fields] = await pool.query(
            "INSERT INTO tbl_admin_user SET ?",
            [adminUserData]
        );
        return adminUserData;
    } catch (error) {
        console.log(error);
    }
};

const updateAdminUserById = async (adminUserId, adminUserData) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_admin_user SET ? WHERE id = ?",
        [adminUserData, adminUserId]
    );
    return result.affectedRows;
};

const deleteAdminUserById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_admin_user WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllAdminUser,
    getAdminUserById,
    createAdminUser,
    updateAdminUserById,
    findAdminUserByUsername,
    deleteAdminUserById,
};
