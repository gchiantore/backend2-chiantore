import { createService, readService, updateService, destroyService, recoveryPassService, forgotPassService } from '../services/users.services.js';


async function createUser(req, res) {
    const message = "USER CREATED";
    const data = req.body;
    const response = await createService(data);
    return res.status(201).json({ response, message });
}
async function getAll(req, res) {
    const message = "USERS FOUND";
    const response = await readService();
    return res.status(200).json({ response, message });
}
async function updateUser(req, res) {
    const { id } = req.params;
    const data = req.body;
    const message = "USER UPDATED";
    const response = await updateService(id, data);
    return res.status(200).json({ response, message });
}
async function deleteUser(req, res) {
    const { id } = req.params;
    const message = "USER DELETED";
    const response = await destroyService(id);
    return res.status(200).json({ response, message });
}

async function forgotPass(req, res){
    const { email} = req.params
    const message = "EMAIL SENDED"
    const response = await forgotPassService( email )
    return res.status(200).json({ response, message })
}

async function recoveryPass(req, res){
    const data = req.body
    const response = await recoveryPassService( data )
    return res.status(200).json({ response })
}

export { createUser, getAll, updateUser, deleteUser, forgotPass, recoveryPass }   