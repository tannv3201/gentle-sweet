const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllServiceCategory = async () => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_service_categories"
    );
    return rows;
};

const getServiceCategoryById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_service_categories WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const createServiceCategory = async (serviceCategory) => {
    const [result, fields] = await pool.query(
        "INSERT INTO tbl_service_categories SET ?",
        [serviceCategory]
    );
    return result;
};

const updateServiceCategoryById = async (id, serviceCategory) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_service_categories SET ? WHERE id = ?",
        [serviceCategory, id]
    );
    return result.affectedRows;
};

const deleteServiceCategoryById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_service_categories WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllServiceCategory,
    getServiceCategoryById,
    createServiceCategory,
    updateServiceCategoryById,
    deleteServiceCategoryById,
};
