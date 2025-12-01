import prisma from '../database/prisma.js';

export const findAllCategories = async () => {
    return await prisma.category.findMany();
}

export const findCategoryById = async (id) => {
    return await prisma.category.findUnique({
        where: {
            id,
        },
    });
}

export const findCategoryByName = async (name) => {
    return await prisma.category.findUnique({
        where: {
            name,
        },
    });
}

export const saveCategory = async (category) => {
    return await prisma.category.create({
        data: category,
    });
}

export const updateCategory = async (id, category) => {
    return await prisma.category.update({
        where: {
            id,
        },
        data: category,
    });
}

export const deleteCategory = async (id) => {
    return await prisma.category.delete({
        where: {
            id,
        },
    });
}
