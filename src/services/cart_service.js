import {
    createCart as createCartRepository,
    findCartById,
    addCartItem,
    updateCartItem,
    removeCartItem,
    findCartItem,
    getCartWithItems,
} from '../repositories/cart_repository.js';
import { findProductById, updateProduct } from '../repositories/product_repository.js';

class CartError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

export const createCart = async (cart) => {
    return await createCartRepository(cart);
};

export const getCartById = async (id) => {
    const cart = await findCartById(id);
    if (!cart) {
        throw new CartError('Cart not found', 404);
    }
    return cart;
};

export const addItemToCart = async (cartId, productId, quantity) => {
    const product = await findProductById(productId);
    if (!product) {
        throw new CartError('Product not found', 404);
    }

    const cart = await findCartById(cartId);
    if (!cart) {
        throw new CartError('Cart not found', 404);
    }

    if (product.estoque < quantity) {
        throw new CartError('Insufficient stock', 400);
    }

    const cartItem = await findCartItem(cartId, productId);

    if (cartItem) {
        const newQuantity = cartItem.quantity + quantity;
        if (product.estoque < newQuantity) {
            throw new CartError('Insufficient stock for updated quantity', 400);
        }
        await updateCartItem(cartItem.id, newQuantity);
    } else {
        await addCartItem(cartId, productId, quantity);
    }

    const newStock = product.estoque - quantity;
    await updateProduct(productId, { estoque: newStock });

    return await getCartWithItems(cartId);
};

export const removeItemFromCart = async (cartId, productId, quantityToRemove) => {
    const cart = await findCartById(cartId);
    if (!cart) {
        throw new CartError('Cart not found', 404);
    }

    const cartItem = await findCartItem(cartId, productId);
    if (!cartItem) {
        throw new CartError('Product not in cart', 404);
    }

    const product = await findProductById(productId);
    if (!product) {
        throw new CartError('Product not found', 404); // Should not happen
    }
    
    if(quantityToRemove > cartItem.quantity) {
        throw new CartError('Cannot remove more items than are in the cart', 400);
    }

    const newQuantity = cartItem.quantity - quantityToRemove;
    
    if (newQuantity > 0) {
        await updateCartItem(cartItem.id, newQuantity);
    } else {
        await removeCartItem(cartItem.id);
    }
    
    const newStock = product.estoque + quantityToRemove;
    await updateProduct(productId, { estoque: newStock });

    return await getCartWithItems(cartId);
};
