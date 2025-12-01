import {
    saveCategory,
    findAllCategories,
    findCategoryById,
    updateCategory,
    deleteCategory,
    findCategoryByName
} from "../repositories/category_repository.js";

class CategoryError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

export const create = async (category) => {
    const existingCategory = await findCategoryByName(category.name);
    if (existingCategory) {
        throw new CategoryError('Category name already registered', 400);
    }
    
    const newCategory = await saveCategory(category);
    return newCategory;
}

export const getAllCategories = async () => {
    return await findAllCategories();
}

export const getCategoryById = async (id) => {
    if (id == null || id == 0) {
        throw new CategoryError('Invalid category ID', 400);
    }
    const category = await findCategoryById(id);
    if (!category) {
        throw new CategoryError('Category not found', 404);
    }
    return category;
}

export const updateCategoryById = async (id, category) => {
    if (id == null || id == 0) {
        throw new CategoryError('Invalid category ID', 400);
    }
    const existingCategory = await findCategoryById(id);
    if (!existingCategory) {
        throw new CategoryError('Category not found', 404);
    }
    return await updateCategory(id, category);
}

export const deleteCategoryById = async (id) => {
    if (id == null || id == 0) {
        throw new CategoryError('Invalid category ID', 400);
    }
    const existingCategory = await findCategoryById(id);
    if (!existingCategory) {
        throw new CategoryError('Category not found', 404);
    }
    return await deleteCategory(id);
}
