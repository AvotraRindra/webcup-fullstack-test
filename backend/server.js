const http = require("http");
const db = require("./db");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

function sendJSON(res, status, data) {
    res.writeHead(status, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    });

    res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {

    // CORS
    if (req.method === "OPTIONS") {
        res.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
        });

        return res.end();
    }

    // GET /
    if (req.url === "/" && req.method === "GET") {
        return sendJSON(res, 200, {
            message: "🚀 WebCup API fonctionne"
        });
    }

    // GET /api/test
    if (req.url === "/api/test" && req.method === "GET") {
        return sendJSON(res, 200, {
            success: true,
            message: "API Node.js opérationnelle"
        });
    }

    // GET /api/db
    if (req.url === "/api/db" && req.method === "GET") {
        try {
            const [rows] = await db.query(
                "SELECT NOW() AS date"
            );

            return sendJSON(res, 200, {
                success: true,
                message: "Connexion MySQL réussie",
                mysql: rows[0]
            });

        } catch (error) {
            console.error(error);

            return sendJSON(res, 500, {
                success: false,
                message: "Connexion MySQL impossible"
            });
        }
    }

    // Routes users
    if (userRoutes(req, res)) {
        return;
    }

    // Routes products
    if (productRoutes(req, res)) {
        return;
    }

    // 404
    sendJSON(res, 404, {
        error: "Route introuvable"
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`API démarrée`);
});