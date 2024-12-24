import userModel from '../models/users.model.js';
import Manager from './manager.js';

const usersManager = new Manager(userModel);

const { create, read, readByEmail,readById, readPaginate,update, destroy } = usersManager

export { create, read, readByEmail,readById, readPaginate, update, destroy }

