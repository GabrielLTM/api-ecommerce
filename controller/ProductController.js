import {
    create as createProductService,
    getAllProducts as getAllProductsService,
    getProductById as getProductByIdService,
    updateProductById as updateProductService,
    deleteProductById as deleteProductService
} from "../services/ProductService.js";

export const createProduct = async (req, res) => {
    try {
        const { name, price, category, brandId } = req.body;
        if (!name || !price || !category || !brandId) {
            return res.status(400).json({ message: "The fields 'name', 'price', 'category' and 'brandId' are mandatory." });
        }
        const product = { name, price, category, brandId };
        const newProduct = await createProductService(product);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getProducts = async (req, res) => {
    try {
        const products = await getAllProductsService();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await getProductByIdService(id);
        res.status(200).json(product);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const { name, price, category, brandId } = req.body;
        const product = { name, price, category, brandId };
        const updatedProduct = await updateProductService(id, product);
        res.status(200).json(updatedProduct);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteProductService(id);
        res.status(204).send();
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
}
