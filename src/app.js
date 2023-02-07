import express, { response } from "express";
import { producto } from "./productManager.js";
const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
    let totalProducts = await producto.getProducts();
    let limit = parseInt(req.query.limit)
    let arraylimit = []
    let x = 0
    if (limit) {
        while (x < limit) {
            arraylimit.push(totalProducts[x])
            x++
        }
        res.send(arraylimit)
    }
     res.send(totalProducts);

});

app.get('/products/:productId', async (req, res) => {
    const id = parseInt(req.params.productId)
    let productsById = await producto.getProductById(id)
    res.send(productsById);
})

const port = 8080;
app.listen(port, () => {
    console.log('Server listening at Port: ', port)
});