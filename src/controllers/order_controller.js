import {
    createOrder as createOrderService,
    getAllOrders as getAllOrdersService,
    getOrderById as getOrderByIdService,
    updateOrderStatus as updateOrderStatusService,
    deleterOrderById as deleteOrderService
} from "../services/order_service.js";

export const createOrder = async (req, res) => {
    try {
        const { clientId, items, paymentMethod } = req.body;
        if (!clientId || !items || !paymentMethod) {
            return res.status(400).json({ message: "The fields 'clientId', 'items' and 'paymentMethod' are mandatory." });
        }
        const orderData = { clientId, items, paymentMethod };
        const newOrder = await createOrderService(orderData);
        res.status(201).json(newOrder);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
}

export const getOrders = async (req, res) => {
    try {
        const orders = await getAllOrdersService();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await getOrderByIdService(id);
        res.status(200).json(order);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
}

export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        if (!status) {
            return res.status(400).json({ message: "The 'status' field is mandatory." });
        }
        const updatedOrder = await updateOrderStatusService(id, status);
        res.status(200).json(updatedOrder);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
}

export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteOrderService(id);
        res.status(204).send();
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
}
