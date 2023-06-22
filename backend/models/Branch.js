const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllBranch = async () => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_branch WHERE status > '0'"
    );
    return rows;
};

const getBranchById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_branch WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const createBranch = async (productCategory) => {
    const [result, fields] = await pool.query("INSERT INTO tbl_branch SET ?", [
        productCategory,
    ]);
    return result;
};

const updateBranchById = async (id, productCategory) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_branch SET ? WHERE id = ?",
        [productCategory, id]
    );
    return result.affectedRows;
};

const deleteBranchById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_branch WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllBranch,
    getBranchById,
    createBranch,
    updateBranchById,
    deleteBranchById,
};
