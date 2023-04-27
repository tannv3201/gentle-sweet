const pool = require("../config/database");

const getAllService = async () => {
    const [rows, fields] = await pool.query("SELECT * FROM tbl_services");
    return rows;
};

const getServiceById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_services WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const createService = async (product) => {
    const [result, fields] = await pool.query(
        "INSERT INTO tbl_services SET ?",
        [product]
    );
    return result;
};

const updateServiceById = async (id, product) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_services SET ? WHERE id = ?",
        [product, id]
    );
    return result.affectedRows;
};

const deleteServiceById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_services WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllService,
    getServiceById,
    createService,
    updateServiceById,
    deleteServiceById,
};
