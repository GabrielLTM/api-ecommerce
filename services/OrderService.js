import {
    saveOrder,
    findAllOrders,
    findOrderById,
    updateOrderStatus as updateOrderStatusRepository
} from "../repository/OrderRepository.js";
import { findProductById } from "../repository/ProductRepository.js";

class OrderError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

export const createOrder = async (orderData) => {
    let total = 0;
    for (const item of orderData.items) {
        const product = await findProductById(item.productId);
        if (!product) {
            throw new OrderError(`Product with id ${item.productId} not found`, 404);
        }
        total += product.price * item.quantity;
    }

    const validPaymentMethods = ['CREDIT_CARD', 'DEBIT_CARD', 'CASH'];

    if (!validPaymentMethods.includes(orderData.paymentMethod)) {
        throw new OrderError(`Invalid payment method. Valid methods are: ${validPaymentMethods.join(', ')}`, 400);
    }

    const orderToSave = {
        ...orderData,
        total: total
    };

    const newOrder = await saveOrder(orderToSave);
    return newOrder;
}

export const getAllOrders = async () => {
    return await findAllOrders();
}

export const getOrderById = async (id) => {
    if (id == null || id == 0) {
        throw new OrderError('Invalid order ID', 400);
    }
    const order = await findOrderById(id);
    if (!order) {
        throw new OrderError('Order not found', 404);
    }
    return order;
}

export const updateOrderStatus = async (id, status) => {
    if (id == null || id == 0) {
        throw new OrderError('Invalid order ID', 400);
    }
    const existingOrder = await findOrderById(id);
    if (!existingOrder) {
        throw new OrderError('Order not found', 404);
    }

    const validStatus = ['PAID', 'CANCELED', 'COMPLETED'];
    if (!validStatus.includes(status)) {
        throw new OrderError(`Invalid status. Valid statuses are: ${validStatus.join(', ')}`, 400);
    }

    return await updateOrderStatusRepository(id, status);
}
