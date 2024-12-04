import { connect } from "mongoose";

async function dbConnect() {
    try {
        await connect(process.env.DATABASE_URI)
        console.log("mongodb connected");        
    } catch (error) {
        console.log(error);        
    }
}

export default dbConnect