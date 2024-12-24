import userModel from '../models/users.model.js';
import Manager from './manager.js';

const cartsManager = new Manager(userModel);

const { create, read,update, destroy } = cartsManager

export { create, read, update, destroy }