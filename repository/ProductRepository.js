import { products } from '../database/index.js';

let idCounter = 1;

export const findProductById = async (id) => {
    return products.find(product => product.id === id);
}

export const findProductByName = async (name) => {
    return products.find(product => product.name === name);
}

export const findAllProducts = async () => {
    return products;
}

export const saveProduct = async (product) => {
    const newProduct = { ...product, id: (idCounter++).toString() };
    products.push(newProduct);
    return newProduct;
}

export const updateProduct = async (id, product) => {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...product };
        return products[index];
    }
    return null;
}

export const deleteProduct = async (id) => {
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        const deletedProduct = products.splice(index, 1);
        return deletedProduct[0];
    }
    return null;
}