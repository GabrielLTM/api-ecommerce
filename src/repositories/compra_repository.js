import prisma from '../database/prisma.js';

export async function listar() {
    return await prisma.compra.findMany({
        include: {
            itens: {
                include: {
                    produto: true,
                },
            },
            fornecedor: true,
        },
    });
}

export async function inserir(compra) {
    const { fornecedorId, produtosDiferentes, itens } = compra;

    return await prisma.compra.create({
        data: {
            fornecedor: {
                connect: {
                    id: fornecedorId,
                },
            },
            produtosDiferentes,
            itens: {
                create: itens.map((item) => ({
                    produto: {
                        connect: {
                            id: item.produtoId,
                        },
                    },
                    quantidade: item.quantidade,
                })),
            },
        },
        include: {
            itens: true,
        },
    });
}