const pool = require("../config/database");

const createProduct = async (product) => {
    const [result, fields] = await pool.query("INSERT INTO tbl_upload SET ?", [
        product,
    ]);
    return result;
};

module.exports = {
    createProduct,
};
