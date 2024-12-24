import CustomRouter from '../../utils/CustomRouter.util.js';
import { uploader } from '../../utils/uploader.js';
import { createUser, getAll, updateUser, deleteUser, forgotPass, recoveryPass  } from '../../controllers/users.controllers.js';


class UserApiRouter extends CustomRouter {
    constructor() {
        super();
        this.init();
    }
    init = () => {
        this.read('/', ['ADMIN'], getAll);
        this.create('/', ['ADMIN'], createUser);
        this.update('/:id', ['ADMIN', 'USER'], updateUser);
        this.destroy('/:id', ['ADMIN', 'USER'], deleteUser);
        this.read('/forgotpass/:email', ['PUBLIC'],forgotPass);
        this.create('/recoverypass/',['PUBLIC'],recoveryPass);
    }
}

let userApiRouter = new UserApiRouter();
userApiRouter = userApiRouter.getRouter();
export default userApiRouter;


