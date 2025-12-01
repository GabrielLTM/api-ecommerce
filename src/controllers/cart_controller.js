import {
    createCart as createCartService,
    getCartById as getCartByIdService,
    addItemToCart as addItemToCartService,
    removeItemFromCart as removeItemFromCartService,
} from '../services/cart_service.js';

export const createCart = async (req, res) => {
    try {
        const { clientName } = req.body;
        if (!clientName) {
            return res.status(400).json({ message: "The 'clientName' field is mandatory." });
        }
        const cart = { clientName };
        const newCart = await createCartService(cart);
        res.status(201).json(newCart);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
};

export const getCart = async (req, res) => {
    const { id } = req.params;
    try {
        const cart = await getCartByIdService(id);
        res.status(200).json(cart);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
};

export const addItem = async (req, res) => {
    const { id } = req.params;
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({ message: "The fields 'productId' and 'quantity' are mandatory." });
    }

    try {
        const updatedCart = await addItemToCartService(id, productId, quantity);
        res.status(200).json(updatedCart);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
};

export const removeItem = async (req, res) => {
    const { id, productId } = req.params;
    const { quantity } = req.body;

    if (!quantity) {
        return res.status(400).json({ message: "The 'quantity' field is mandatory." });
    }

    try {
        const updatedCart = await removeItemFromCartService(id, productId, quantity);
        res.status(200).json(updatedCart);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
};
