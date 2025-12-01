import {
    create as createCategoryService,
    getAllCategories as getAllCategoriesService,
    getCategoryById as getCategoryByIdService,
    updateCategoryById as updateCategoryService,
    deleteCategoryById as deleteCategoryService,
} from "../services/category_service.js";

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ message: "The 'name' field is mandatory." });
        }
        const category = { name, description };
        const newCategory = await createCategoryService(category);
        res.status(201).json(newCategory);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await getAllCategoriesService();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await getCategoryByIdService(id);
        res.status(200).json(category);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
}

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const { name, description } = req.body;
        const category = { name, description };
        const updatedCategory = await updateCategoryService(id, category);
        res.status(200).json(updatedCategory);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteCategoryService(id);
        res.status(204).send();
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
}
