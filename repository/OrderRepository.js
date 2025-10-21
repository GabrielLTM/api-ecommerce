import { orders, orderItems, products, clients } from '../database/index.js';

let orderIdCounter = 1;
let orderItemIdCounter = 1;

export const saveOrder = async (orderData) => {
    const newOrder = {
        id: (orderIdCounter++).toString(),
        clientId: orderData.clientId,
        paymentMethod: orderData.paymentMethod,
        status: 'PENDING',
        createdAt: new Date(),
        items: [],
    };

    const newOrderItems = orderData.items.map(item => {
        const newOrderItem = {
            id: (orderItemIdCounter++).toString(),
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
        };
        orderItems.push(newOrderItem);
        return newOrderItem;
    });

    newOrder.items = newOrderItems;
    orders.push(newOrder);

    return newOrder;
};

export const findAllOrders = async () => {
    return orders.map(order => ({
        ...order,
        items: order.items.map(item => ({
            ...item,
            product: products.find(p => p.id === item.productId),
        })),
        client: clients.find(c => c.id === order.clientId),
    }));
}

export const findOrderById = async (id) => {
    const order = orders.find(o => o.id === id);
    if (!order) return null;

    return {
        ...order,
        items: order.items.map(item => ({
            ...item,
            product: products.find(p => p.id === item.productId),
        })),
        client: clients.find(c => c.id === order.clientId),
    };
}

export const updateOrderStatus = async (id, status) => {
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
        orders[index].status = status;
        return orders[index];
    }
    return null;
}
