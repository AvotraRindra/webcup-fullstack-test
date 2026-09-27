const {
    getUsers,
    createUser
} = require("../controllers/userController");

function userRoutes(req, res) {

    if (req.url === "/api/users" && req.method === "GET") {
        getUsers(req, res);
        return true;
    }

    if (req.url === "/api/users" && req.method === "POST") {
        createUser(req, res);
        return true;
    }

    return false;
}

module.exports = userRoutes;