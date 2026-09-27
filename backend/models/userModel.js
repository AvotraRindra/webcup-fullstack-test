const db = require("../db");

async function getAllUsers() {
    const [rows] = await db.query(
        "SELECT * FROM users ORDER BY id DESC"
    );

    return rows;
}

async function createUser(nom, email) {
    const [result] = await db.query(
        "INSERT INTO users (nom, email) VALUES (?, ?)",
        [nom, email]
    );

    return {
        id: result.insertId,
        nom,
        email
    };
}

module.exports = {
    getAllUsers,
    createUser
};