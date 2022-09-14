import { User } from '../models';
import { success, fail } from '../helpers/responseGenerator.js';
import { getHashedPassword } from '../helpers/hash.js';
import { USER_ROLES } from '../conf/main.js';

class CategoryController {
    async getAllUsers(req, res) {
        const allUsers = await User.findAll({
            attributes: ['id', 'login', 'name'],
        });
        res.json(success(allUsers));
    }

    async addNewUser(req, res) {
        try {
            const { name, login, password } = req.body;

            const searchDuplicate = await User.findOne({
                where: {
                    login,
                }
            });

            if (searchDuplicate) {
                res.send(fail('cantAddUserDuplicate'));
                return;
            }

            const passwordHash = getHashedPassword(password);
            await User.create({
                name,
                login,
                role: USER_ROLES.PROVIDER,
                password: passwordHash,
            });

            res.json(success('AddedNewUser'));
        } catch(e) {
            // console.log(e);
            res.send(fail('cantAddNewUser' + e));
        }
    }

}

export default new CategoryController();
