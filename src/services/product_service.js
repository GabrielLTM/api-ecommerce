import {
    saveProduct,
    findAllProducts,
    findProductById,
    updateProduct,
    deleteProduct,
    findProductByName
} from "../repositories/product_repository.js";

import { findBrandById } from "../repositories/brand_repository.js";
import { buscarPorId as findFornecedorById } from "../repositories/fornecedor_repository.js";
import { findCategoryById } from "../repositories/category_repository.js";

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
    
    const brand = await findBrandById(product.brandId);
    if (!brand) {
        throw new ProductError('Brand not found for the given brandId', 400);
    }
    const category = await findCategoryById(product.categoryId);
    if (!brand) {
        throw new ProductError('Category not found for the given categoryId', 400);
    }
    const newProduct = await saveProduct(product);
    return newProduct;
}

export const getAllProducts = async (categoryId) => {
    return await findAllProducts(categoryId);
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

