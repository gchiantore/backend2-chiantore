import CustomRouter from "../../utils/CustomRouter.util.js";
import productsApiRouter from "./products.api.js";
import cartsApiRouter from "./carts.api.js";
import usersApiRouter from "./users.api.js";
import authApiRouter from "./auth.api.js";  

class ApiRouter extends CustomRouter {
    constructor() {
        super();    
        this.init();
    }
    init = () => {
        this.use("/products",["PUBLIC"], productsApiRouter);
        this.use("/carts",["PUBLIC"], cartsApiRouter);
        this.use("/users", ["PUBLIC"],usersApiRouter);    
        this.use("/auth",["PUBLIC"], authApiRouter);
    }

}
let apiRouter = new ApiRouter();
apiRouter = apiRouter.getRouter();
export default apiRouter;