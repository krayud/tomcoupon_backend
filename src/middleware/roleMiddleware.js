const jwt = require('jsonwebtoken');
import { ACCESS_TOKEN_SECRET } from '../conf/main.js';
import { success, fail } from '../helpers/responseGenerator.js';

export default (roles) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token) {
                return res.status(401).json(fail(['tokenNotFound']));
            }

            const { role, userId } = jwt.verify(token, ACCESS_TOKEN_SECRET);
            if (roles.includes(role)) {
                res.locals.userId = userId;
                res.locals.userRole = role;
                next();
            } else {
                return res.status(403).json(fail(['incorrectUserRole']));
            }
        } catch(e) {
            return res.status(401).json(fail(['checkUserRoleError']));
        }
    }
}
