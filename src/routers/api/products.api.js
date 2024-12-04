import CustomRouter from '../../utils/CustomRouter.util.js';
import { create, read, update, destroy } from '../../data/mongo/managers/products.manager.js';
import passportCb from "../../middlewares/passportCb.mid.js";


class ProductApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.read('/', ['PUBLIC'], getAll);
        this.create('/', ['ADMIN'], createProduct);
        this.update('/:pid', ['ADMIN'], updateProduct);
        this.destroy('/:pid', ['ADMIN'], deleteProduct);
    }
}


let productsApiRouter = new ProductApiRouter();
productsApiRouter = productsApiRouter.getRouter();
export default productsApiRouter;

async function createProduct(req, res) {
    const message = "PRODUCT CREATED";
    const data = req.body;
    const response = await create(data);
    return res.json201(response, message);
}
async function getAll(req, res) {
    const message = "PRODUCTS FOUND";
    const response = await read();
    if (response.length > 0) {
        return res.json200(response, message);
    }
    return res.json404();
}
async function updateProduct(req, res) {
    const { id } = req.params;
    const data = req.body;
    const message = "PRODUCT UPDATED";
    const response = await update(id, data);
    if (response) {
        return res.json200(response, message);
    }
    return res.json404();
}
async function deleteProduct(req, res) {
    const { id } = req.params;
    const message = "PRODUCT DELETED";
    const response = await destroy(id);
    if (response) {
        return res.json200(response, message);
    }
    return res.json404();
}