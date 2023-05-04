const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllRole = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM tbl_role");
    return rows;
};

const getRoleById = async (roleId) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_role WHERE id= (?)",
        [roleId]
    );
    return rows[0];
};

const createRole = async (roleData) => {
    try {
        const [result, fields] = await pool.query(
            "INSERT INTO tbl_role SET ?",
            [roleData]
        );
        return roleData;
    } catch (error) {
        console.log(error);
    }
};

const updateRoleById = async (roleId, roleData) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_account SET ? WHERE id = ?",
        [accountData, roleId]
    );
    return result.affectedRows;
};

module.exports = {
    getAllRole,
    getRoleById,
    updateRoleById,
    createRole,
};
