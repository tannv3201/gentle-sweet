const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const checkEmailExists = async (email) => {
    const [rows, fields] = await pool.query(
        "SELECT email FROM tbl_customer_user WHERE email = ? ",
        [email]
    );
    return rows[0];
};

const sendVerifyCode = async (data) => {
    const [result, fields] = await pool.query(
        "INSERT INTO tbl_verify_code SET ?",
        [data]
    );
    return result;
};

const checkVerifyCode = async (codeId) => {
    const [rows, fields] = await pool.query(
        "SELECT random_code,created_at FROM tbl_verify_code WHERE id = ? ",
        [codeId]
    );
    return rows[0];
};

module.exports = {
    sendVerifyCode,
    checkVerifyCode,
    checkEmailExists,
};
