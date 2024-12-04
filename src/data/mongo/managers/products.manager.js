import productModel from '../models/pruducts.model.js';
import Manager from './manager.js';

const productsManager = new Manager(productModel);

const { create, read, readById, readPaginate,update, destroy } = productsManager

export { create, read, readById, readPaginate, update, destroy }