const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const findCustomerUserByEmail = async (email) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_customer_user WHERE email = (?)",
        [email]
    );
    return rows[0];
};

const createResetPassword = async (data) => {
    const [result, fields] = await pool.query(
        "INSERT INTO tbl_reset_password SET ?",
        [data]
    );
    return result;
};

const checkVerifyCode = async (codeId) => {
    const [rows, fields] = await pool.query(
        "SELECT rp.random_code,rp.created_at, cus.id FROM tbl_reset_password AS rp JOIN tbl_customer_user AS cus ON rp.customer_user_id = cus.id WHERE rp.id = ? ",
        [codeId]
    );
    return rows[0];
};

module.exports = {
    findCustomerUserByEmail,
    createResetPassword,
    checkVerifyCode,
};
