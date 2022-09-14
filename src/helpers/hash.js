const bcrypt = require('bcrypt');
import { PASSWORD_SALT } from '../conf/main.js';

const getHashedPassword = (password) => {
    const hash = bcrypt.hashSync(password, 7);
    console.log(hash);
    return hash;
}

export {
    getHashedPassword,
}
