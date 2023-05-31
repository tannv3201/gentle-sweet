const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const getAllService = async () => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_service WHERE status > 0"
    );
    return rows;
};

const getServiceById = async (id) => {
    const [rows, fields] = await pool.query(
        "SELECT * FROM tbl_service WHERE id= (?)",
        [id]
    );
    return rows[0];
};

const createService = async (service) => {
    const [result, fields] = await pool.query("INSERT INTO tbl_service SET ?", [
        service,
    ]);
    return result;
};

const updateServiceById = async (id, service) => {
    const [result, fields] = await pool.query(
        "UPDATE tbl_service SET ? WHERE id = ?",
        [service, id]
    );
    return result.affectedRows;
};

const deleteServiceById = async (id) => {
    const [result, fields] = await pool.query(
        "DELETE FROM tbl_service WHERE id = ?",
        [id]
    );
    return result.affectedRows;
};

const serviceSearch = async (params) => {
    let query = "SELECT * FROM tbl_service WHERE status > 0";
    const values = [];

    if (params.service_category_id) {
        query += " AND service_category_id = (?)";
        values.push(params.service_category_id);
    }

    if (params.limit) {
        query += " LIMIT ?";
        values.push(parseInt(params.limit));
    }

    const [rows, fields] = await pool.query(query, values);
    return rows;
};

module.exports = {
    getAllService,
    getServiceById,
    createService,
    serviceSearch,
    updateServiceById,
    deleteServiceById,
};
