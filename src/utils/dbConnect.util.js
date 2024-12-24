import { connect } from "mongoose";
import envUtil from "./env.util.js";

async function dbConnect() {
    try {
        await connect(envUtil.DATABASE_URI)
        console.log("mongodb connected");        
    } catch (error) {
        console.log(error);        
    }
}

export default dbConnect