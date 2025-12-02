import prisma from '../database/prisma.js';

export const createCart = async (cart) => {
    return await prisma.cart.create({
        data: cart,
    });
};

export const findCartById = async (id) => {
    return await prisma.cart.findUnique({
        where: { id },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            brand: true,
                            category: true,
                        }
                    },
                },
            },
        },
    });
};

export const findCartItem = async (cartId, productId) => {
    return await prisma.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId,
                productId,
            },
        },
    });
};

export const addCartItem = async (cartId, productId, quantity) => {
    return await prisma.cartItem.create({
        data: {
            cart: { connect: { id: cartId } },
            product: { connect: { id: productId } },
            quantity,
        },
    });
};

export const updateCartItem = async (itemId, quantity) => {
    return await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity },
    });
};

export const removeCartItem = async (itemId) => {
    return await prisma.cartItem.delete({
        where: { id: itemId },
    });
};

export const getCartWithItems = async (cartId) => {
    return await prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  };
