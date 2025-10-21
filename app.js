import 'dotenv/config';
import express from 'express';
import authRoutes from './routes/AuthRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import brandRoutes from './routes/BrandRoutes.js';
import productRoutes from './routes/ProductRoutes.js';
import clientRoutes from './routes/ClientRoutes.js';
import orderRoutes from './routes/OrderRoutes.js';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/products', productRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/orders', orderRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
