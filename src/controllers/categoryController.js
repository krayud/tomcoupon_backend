import { Category } from '../models'; 
import { success, fail } from '../helpers/responseGenerator.js';

class CategoryController {
    async getAll(req, res) {
        const allCats = await Category.findAll();  
        res.json(success(allCats));
    }
}

export default new CategoryController();
