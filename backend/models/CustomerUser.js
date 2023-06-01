const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllCustomerUser = async () => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_customer_user WHERE status > 0"
    );
    return rows;
};

const getCustomerUserById = async (customerUserId) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_customer_user WHERE id= (?)",
        [customerUserId]
    );
    return rows[0];
};

const findCustomerUserByUsername = async (username) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_customer_user WHERE username= (?)",
        [username]
    );
    return rows[0];
};

// const findCustomerUserByEmail = async (email) => {
//     const [rows, fields] = await pool.query(
//         "SELECT * FROM tbl_customer_user WHERE email = (?)",
//         [email]
//     );
//     return rows[0];
// };

const createCustomerUser = async (customerUserData) => {
    try {
        const [result, fields] = await pool.query(
            "INSERT INTO tbl_customer_user SET ?",
            [customerUserData]
        );
        return result;
    } catch (error) {
        console.log(error);
    }
};

const updateCustomerUserById = async (customerUserId, customerUserData) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_customer_user SET ? WHERE id = ?",
        [customerUserData, customerUserId]
    );
    return result.affectedRows;
};

module.exports = {
    getAllCustomerUser,
    getCustomerUserById,
    createCustomerUser,
    updateCustomerUserById,
    findCustomerUserByUsername,
};
