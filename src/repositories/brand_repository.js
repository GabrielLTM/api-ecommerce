import prisma from '../database/prisma.js';

export const saveBrand = async (name, urlLogo) => {
    return await prisma.brand.create({
        data: {
            name,
            urlLogo,
        },
    });
}

export const findBrandById = async (id) => {
    return await prisma.brand.findUnique({
        where: {
            id,
        },
    });
}

export const findAllBrands = async () => {
    return await prisma.brand.findMany();
}

export const findBrandByName = async (name) => {
    return await prisma.brand.findUnique({
        where: {
            name,
        },
    });
}
 
export const updateBrandById = async (id, brand) => {
    return await prisma.brand.update({
        where: {
            id,
        },
        data: brand,
    });
}

export const deleteBrandById = async (id) => {
    return await prisma.brand.delete({
        where: {
            id,
        },
    });
}