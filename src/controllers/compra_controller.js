// src/controllers/compra_controller.js
import * as compraService from '../services/compra_service.js';

export async function listar(req, res, next) {
    try {
        const compras = await compraService.listar();
        res.json(compras);
    } catch (error) {
        next(error);
    }
}

export async function inserir(req, res, next) {
    try {
        const compra = await compraService.inserir(req.body);
        res.status(201).json(compra);
    } catch (error) {
        next(error);
    }
}