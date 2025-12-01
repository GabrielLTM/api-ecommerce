import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/auth_routes.js';
import userRoutes from './routes/user_routes.js';
import brandRoutes from './routes/brand_routes.js';
import productRoutes from './routes/product_routes.js';
import clientRoutes from './routes/client_routes.js';
import orderRoutes from './routes/order_routes.js';
import fornecedorRoutes from './routes/fornecedor_routes.js';
import compraRoutes from './routes/compra_routes.js';
import categoryRoutes from './routes/category_routes.js';
import cartRoutes from './routes/cart_routes.js';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/products', productRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/fornecedores', fornecedorRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/carts', cartRoutes);

app.use((error, req, res, next) => {
    if (error.id && error.msg) {
        res.status(error.id).json({ erro: error.msg });
    } else {
        console.error(error);
        res.status(500).json({ erro: "Erro interno do servidor" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
