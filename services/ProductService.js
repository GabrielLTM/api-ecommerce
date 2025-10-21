import {
    saveProduct,
    findAllProducts,
    findProductById,
    updateProduct,
    deleteProduct,
    findProductByName
} from "../repository/ProductRepository.js";

class ProductError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

export const create = async (product) => {
    const existingProduct = await findProductByName(product.name);
    if (existingProduct) {
        throw new ProductError('Product name already registered');
    }
    const newProduct = await saveProduct(product);
    return newProduct;
}

export const getAllProducts = async () => {
    return await findAllProducts();
}

export const getProductById = async (id) => {
    if (id == null || id == 0) {
        throw new ProductError('Invalid product ID', 400);
    }
    const product = await findProductById(id);
    if (!product) {
        throw new ProductError('Product not found', 404);
    }
    return product;
}

export const updateProductById = async (id, product) => {
    if (id == null || id == 0) {
        throw new ProductError('Invalid product ID', 400);
    }
    const existingProduct = await findProductById(id);
    if (!existingProduct) {
        throw new ProductError('Product not found', 404);
    }
    return await updateProduct(id, product);
}

export const deleteProductById = async (id) => {
    if (id == null || id == 0) {
        throw new ProductError('Invalid product ID', 400);
    }
    const existingProduct = await findProductById(id);
    if (!existingProduct) {
        throw new ProductError('Product not found', 404);
    }
    return await deleteProduct(id);
}
