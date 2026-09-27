const db = require("../db");

async function getAllProducts() {
    const [rows] = await db.query(
        "SELECT * FROM products ORDER BY id DESC"
    );

    return rows;
}

module.exports = {
    getAllProducts
};