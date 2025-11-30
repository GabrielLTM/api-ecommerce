import prisma from '../database/prisma.js';

export const saveClient = async (client) => {
    return await prisma.client.create({
        data: client,
    });
}

export const findAllClients = async () => {
    return await prisma.client.findMany();
}

export const findClientById = async (id) => {
    return await prisma.client.findUnique({
        where: {
            id,
        },
    });
}

export const findClientByEmail = async (email) => {
    return await prisma.client.findUnique({
        where: {
            email,
        },
    });
}

export const findClientByCpf = async (cpf) => {
    return await prisma.client.findUnique({
        where: {
            cpf,
        },
    });
}

export const updateClient = async (id, client) => {
    return await prisma.client.update({
        where: {
            id,
        },
        data: client,
    });
}

export const deleteClient = async (id) => {
    return await prisma.client.delete({
        where: {
            id,
        },
    });
}
