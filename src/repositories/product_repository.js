import prisma from '../database/prisma.js';

export const findProductById = async (id) => {
    return await prisma.product.findUnique({
        where: {
            id,
        },
    });
}

export const findProductByName = async (name) => {
    return await prisma.product.findUnique({
        where: {
            name,
        },
    });
}

export const findAllProducts = async () => {
    return await prisma.product.findMany();
}

export const saveProduct = async (product) => {
    const { name, price, category, estoque, brandId } = product;
    return await prisma.product.create({
        data: {
            name,
            price,
            category,
            estoque,
            brand: {
                connect: {
                    id: brandId,
                },
            },
        },
    });
}

export const updateProduct = async (id, product) => {
    return await prisma.product.update({
        where: {
            id,
        },
        data: product,
    });
}

export const deleteProduct = async (id) => {
    return await prisma.product.delete({
        where: {
            id,
        },
    });
}