import prisma from '../database/prisma.js';

export const saveOrder = async (orderData) => {
    const { clientId, paymentMethod, items } = orderData;

    return await prisma.order.create({
        data: {
            client: {
                connect: {
                    id: clientId,
                },
            },
            paymentMethod,
            items: {
                create: items.map((item) => ({
                    product: {
                        connect: {
                            id: item.productId,
                        },
                    },
                    quantity: item.quantity,
                })),
            },
        },
        include: {
            items: true,
        },
    });
};

export const findAllOrders = async () => {
    return await prisma.order.findMany({
        include: {
            items: {
                include: {
                    product: true,
                },
            },
            client: true,
        },
    });
}

export const findOrderById = async (id) => {
    return await prisma.order.findUnique({
        where: {
            id,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
            client: true,
        },
    });
}

export const updateOrderStatus = async (id, status) => {
    return await prisma.order.update({
        where: {
            id,
        },
        data: {
            status,
        },
    });
}

export const deleteOrder = async (id) => {
    return await prisma.order.delete({
        where: {
            id,
        },
    });
}