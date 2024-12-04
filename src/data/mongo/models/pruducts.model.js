import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import config from '../../../utils/config.js'
import { text } from 'express';


mongoose.pluralize(null); // anulamos comportamiento de renombre por defecto de colecciones

const collection = config.PRODUCTS_COLLECTION;

const schema = new mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true }, 
    price: { type: String, required: true, default: 1},  
    stock: { type: String, required: true, default: 1 },
    category: { type: String, required: true },
    thumbnail:{ type: String, default: "https://hapuricellisa.com.ar/plugins/productos/producto-sin-imagen.png" },
});
schema.plugin(mongoosePaginate);

const Products = mongoose.model(collection, schema);    

export default Products;