const User = require("../models/userModel");

async function getUsers(req, res) {
    try {
        const users = await User.getAllUsers();

        sendJSON(res, 200, users);
    } catch (error) {
        console.error(error);
        sendJSON(res, 500, {
            error: "Erreur serveur"
        });
    }
}

async function createUser(req, res) {
    try {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", async () => {
            try {
                const data = JSON.parse(body);

                if (!data.nom || !data.email) {
                    return sendJSON(res, 400, {
                        error: "nom et email obligatoires"
                    });
                }

                const user = await User.createUser(
                    data.nom,
                    data.email
                );

                sendJSON(res, 201, user);

            } catch (error) {
                console.error(error);

                sendJSON(res, 400, {
                    error: "Données invalides"
                });
            }
        });

    } catch (error) {
        console.error(error);

        sendJSON(res, 500, {
            error: "Erreur serveur"
        });
    }
}

function sendJSON(res, status, data) {
    res.writeHead(status, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(data));
}

module.exports = {
    getUsers,
    createUser
};