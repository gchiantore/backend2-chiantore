import CustomRouter from '../../utils/CustomRouter.util.js';
import { uploader } from '../../utils/uploader.js';
import { create, read, update, destroy } from '../../data/mongo/managers/users.manager.js';


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
    }
}

let userApiRouter = new UserApiRouter();
userApiRouter = userApiRouter.getRouter();
export default userApiRouter;



async function createUser(req, res) {
    const message = "USER CREATED";
    const data = req.body;
    const response = await create(data);
    return res.status(201).json({ response, message });
}
async function getAll(req, res) {
    const message = "USERS FOUND";
    const response = await read();
    return res.status(200).json({ response, message });
}
async function updateUser(req, res) {
    const { id } = req.params;
    const data = req.body;
    const message = "USER UPDATED";
    const response = await update(id, data);
    return res.status(200).json({ response, message });
}
async function deleteUser(req, res) {
    const { id } = req.params;
    const message = "USER DELETED";
    const response = await destroy(id);
    return res.status(200).json({ response, message });
}
