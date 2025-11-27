import prisma from '../database/prisma.js';

export async function listar() {
    return await prisma.fornecedor.findMany();
}

export async function inserir(fornecedor) {
    return await prisma.fornecedor.create({
        data: fornecedor,
    });
}

export async function buscarPorId(id) {
    return await prisma.fornecedor.findUnique({
        where: {
            id,
        },
    });
}

export async function atualizar(id, fornecedor) {
    return await prisma.fornecedor.update({
        where: {
            id,
        },
        data: fornecedor,
    });
}

export async function deletar(id) {
    return await prisma.fornecedor.delete({
        where: {
            id,
        },
    });
}