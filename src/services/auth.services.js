import { update, readByEmail } from "../dao/mongo/managers/users.manager.js";

async function updateService(id, data){
    const response = await update(id, data);
    return response
}

async function verifyService (email, code){
    const user = await readByEmail(email)
    if (user){
        if (user.verifyCode==code){
            user.verifyUser=true
            const response = await update(user._id, user)
            return true
        }
        return false
    }
}


export { updateService, verifyService };