// src/repositories/fornecedor_repository.js
let fornecedores = [];
let autoIncrement = 1;

export function listar() {
    return Promise.resolve(fornecedores);
}

export function inserir(fornecedor) {
    fornecedor.id = autoIncrement++;
    fornecedores.push(fornecedor);
    return Promise.resolve(fornecedor);
}

export function buscarPorId(id) {
    const fornecedor = fornecedores.find(f => f.id == id);
    return Promise.resolve(fornecedor);
}

export function atualizar(id, fornecedor) {
    const index = fornecedores.findIndex(f => f.id == id);
    if (index === -1) {
        return Promise.resolve(null);
    }
    fornecedores[index] = { ...fornecedores[index], ...fornecedor, id: parseInt(id) };
    return Promise.resolve(fornecedores[index]);
}

export function deletar(id) {
    const index = fornecedores.findIndex(f => f.id == id);
    if (index === -1) {
        return Promise.resolve(null);
    }
    const [deleted] = fornecedores.splice(index, 1);
    return Promise.resolve(deleted);
}