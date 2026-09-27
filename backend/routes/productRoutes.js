const {
    getProducts
} = require("../controllers/productController");

function productRoutes(req, res) {

    if (
        req.url === "/api/products" &&
        req.method === "GET"
    ) {
        getProducts(req, res);
        return true;
    }

    return false;
}

module.exports = productRoutes;