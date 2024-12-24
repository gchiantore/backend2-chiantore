import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import config from '../../../utils/config.js';


mongoose.pluralize(null); // anulamos comportamiento de renombre por defecto de colecciones

const collection = config.USERS_COLLECTION;

const schema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, index: true, unique: true },
    emailMkt: { type: String, index: true}, 
    avatar: { type: String, default: "https://img.icons8.com/?size=300&id=7819&format=png&color=b6b1b1" }, //https://cdn-icons-png.flaticon.com/512/149/149071.png
    password: { type: String, required: true },
    role: { type: String, default: 'USER', enum: ['USER','ADMIN','PREM'] },
    verifyUser: { type: Boolean, default: false },
    verifyCode: { type: String, default: "1234" },
    isOnline: { type: Boolean, default: false },
    forgotPass:{ type:Boolean, defautl: false},
    forgotCode:{ type:String, default:""}
});
schema.plugin(mongoosePaginate);

const Users = mongoose.model(collection, schema);    

export default Users;

