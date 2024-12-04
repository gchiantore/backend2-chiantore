import {genSaltSync, hashSync, compareSync} from 'bcrypt';

function createHashUtil(password) {

    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
}    

function verifyHashUtil(password, dbPassword) {
    const verify = compareSync(password, dbPassword);
    return verify;
}    

export {createHashUtil, verifyHashUtil}        