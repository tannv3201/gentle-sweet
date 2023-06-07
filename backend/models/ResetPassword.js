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
        "INSERT INTO tbl_verify_code SET ?",
        [data]
    );
    return result;
};

const checkVerifyCode = async (codeId) => {
    const [rows, fields] = await pool.query(
        "SELECT vc.random_code,vc.created_at, cus.id FROM tbl_verify_code AS vc JOIN tbl_customer_user AS cus ON vc.customer_user_id = cus.id WHERE vc.id = ? ",
        [codeId]
    );
    return rows[0];
};

module.exports = {
    findCustomerUserByEmail,
    createResetPassword,
    checkVerifyCode,
};
