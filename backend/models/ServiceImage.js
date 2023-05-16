const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllServiceImage = async () => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_service_image WHERE status > 0"
    );
    return rows;
};

const getServiceImageById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_service_image WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const getServiceImageByServiceId = async (product_id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_service_image WHERE product_id = (?) AND status > 0",
        [product_id]
    );
    return rows;
};

const createServiceImage = async (productImage) => {
    const [result, fields] = await pool.query(
        "INSERT INTO tbl_service_image SET ?",
        [productImage]
    );
    return result;
};

const updateServiceImageById = async (id, productImage) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_service_image SET ? WHERE id = ?",
        [productImage, id]
    );
    return result.affectedRows;
};

const deleteServiceImageById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_service_image WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

module.exports = {
    getAllServiceImage,
    getServiceImageById,
    getServiceImageByServiceId,
    createServiceImage,
    updateServiceImageById,
    deleteServiceImageById,
};
