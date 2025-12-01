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
    return await prisma.product.findMany(
    //     {
    //     include: {
    //         brand: true,
    //         category: true
    //     }
    // }
);
}

export const saveProduct = async (product) => {
    const { name, price, description, categoryId, estoque, brandId } = product;
    console.log(estoque + " estoque");
    console.log(description + " description");
    return await prisma.product.create({
        data: {
            name,
            price,
            description,
            estoque,
            categoryId,
            brandId
        },
    });
}

export const updateProduct = async (id, product) => {
    const { name, price, description, categoryId, estoque, brandId } = product;
    console.log(estoque + " estoque");
    console.log(description + " description");
    return await prisma.product.update({
        where: {
            id,
        },
        data: {
            name,
            price,
            description,
            estoque,
            categoryId,
            brandId
        },
    });
}

export const deleteProduct = async (id) => {
    return await prisma.product.delete({
        where: {
            id,
        },
    });
}