const pool = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const createTest = async (test) => {
    const [result, fields] = await pool.query(
        "INSERT INTO test SET ? RETURNING id",
        [test]
    );
    return result;
};

module.exports = { createTest };
