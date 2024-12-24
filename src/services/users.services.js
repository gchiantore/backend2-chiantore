import { create, read, update, destroy, readByEmail } from '../dao/mongo/managers/users.manager.js';
import { createHashUtil } from '../utils/hash.util.js';
import { sendForgotPassEmail } from '../utils/nodemailer.util.js';

async function createService(data){
    const response = await create(data);
    return response
}
async function readService(){
    const response = await read();
    return response
}
async function updateService(id, data){
    const response = await update(id, data);
    return response
}
async function destroyService(id){
    const response = await destroy(id);
    return response
}

async function forgotPassService(email){
    const user = await readByEmail(email)
    if (user){
        const code= Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
        const newData={
            forgotPass:true,
            forgotCode:code
        }
        const response = await update(user._id, newData)
        sendForgotPassEmail(email, code)
    }
}

async function recoveryPassService(data){
    const user = await readByEmail(data.email)
    let message=""
    if (user){
        if (user.forgotPass){
            if (user.forgotCode==data.forgotCode){
                const newPassword=createHashUtil(data.password)
                const newData={
                    password:newPassword,
                    forgotPass:false,
                    forgotCode:""
                }
                const response = await update(user._id, newData)
                message="PASS RECOVERY"
                return message
            } else {
                message="INVALID RECOVERY CODDE"
                return message
            }
        }else{
            message="INVALID USER"
            return message
        }
    }else{
        message="INVALID DON'T EXIST"
        return message
    }        
}


export { createService, readService, updateService, destroyService, recoveryPassService, forgotPassService }