import CustomRouter from '../../utils/CustomRouter.util.js';
import { getAll, createProduct, updateProduct, deleteProduct } from '../../controllers/products.controllers.js';

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