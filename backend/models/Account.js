const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllAccount = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM tbl_account");
    return rows;
};

const getAccountById = async (accountId) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_account WHERE id= (?)",
        [accountId]
    );
    return rows[0];
};

const findAccountByUsername = async (username) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_account WHERE username= (?)",
        [username]
    );
    return rows[0];
};

const createAccount = async (accountData) => {
    try {
        const [result, fields] = await pool.query(
            "INSERT INTO tbl_account SET ?",
            [accountData]
        );
        return accountData;
    } catch (error) {
        console.log(error);
    }
};

const updateAccountById = async (accountId, accountData) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_account SET ? WHERE id = ?",
        [accountData, accountId]
    );
    return result.affectedRows;
};

const deleteAccountById = async (accountId) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_account WHERE id = ?",
        [accountId]
    );
    return result.affectedRows;
};

module.exports = {
    getAllAccount,
    getAccountById,
    createAccount,
    updateAccountById,
    deleteAccountById,
    findAccountByUsername,
};
