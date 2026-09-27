const Product = require("../models/productModel");

async function getProducts(req, res) {
    try {
        const products = await Product.getAllProducts();

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(products));

    } catch (error) {
        console.error(error);

        res.writeHead(500, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
            error: "Erreur serveur"
        }));
    }
}

module.exports = {
    getProducts
};