import prisma from '../database/prisma.js';

export const createUser = async (user) => {
    return await prisma.user.create({
        data: user,
    });
}

export const getUser = async (userId) => {
    return await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
}

export const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
}

export const findUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email,
        },
    });
}

export const updateUser = async (id, user) => {
    return await prisma.user.update({
        where: {
            id,
        },
        data: user,
    });
}

export const deleteUser = async (id) => {
    return await prisma.user.delete({
        where: {
            id,
        },
    });
}