import * as compraRepository from '../repositories/compra_repository.js';
import * as productRepository from '../repositories/product_repository.js';
import * as fornecedorRepository from '../repositories/fornecedor_repository.js';

export async function listar() {
    return await compraRepository.listar();
}

export async function inserir(compra) {
    // 1. Validação básica
    if (!compra || !compra.fornecedorId || !compra.itens || compra.itens.length === 0) {
        throw { id: 400, msg: "Dados da compra incompletos" };
    }

    // 2. Validar se o fornecedor da compra existe
    const fornecedorCompra = await fornecedorRepository.buscarPorId(compra.fornecedorId);
    if (!fornecedorCompra) {
        throw { id: 404, msg: "Fornecedor da compra não encontrado" };
    }

    let produtosDiferentesCount = 0;

    // 3. Processar cada item da compra (RN 1 e RN 2)
    // Usamos Promise.all para processar todos os itens em paralelo (Aula 05/06)
    const promisesItens = compra.itens.map(async (item) => {
        // Busca o produto no nosso estoque
        const produto = await productRepository.findProductById(item.produtoId);
        if (!produto) {
            throw { id: 404, msg: `Produto com ID ${item.produtoId} não encontrado` };
        }

        await productRepository.updateProduct(produto.id, {
        estoque: produto.estoque + item.quantidade
        });

        // RN 2: Calcular "produtos diferentes"
        // Compara o 'fornecedorPadrao' do produto (ID) com o 'fornecedorId' da compra (ID)
        if (produto.fornecedorPadrao !== compra.fornecedorId) {
            produtosDiferentesCount++;
        }
    });

    // Espera todas as atualizações de estoque e verificações terminarem
    await Promise.all(promisesItens);

    const novaCompra = {
        dataHora: new Date(),
        fornecedorId: compra.fornecedorId,
        itens: compra.itens,
        produtosDiferentes: produtosDiferentesCount
    };

    // Salvar a compra
    return await compraRepository.inserir(novaCompra);
}