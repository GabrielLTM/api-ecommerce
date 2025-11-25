let listaProdutos = [];
let autoIncrement = 1;

export const listar = async () => {
    return Promise.resolve(listaProdutos);
}

export const inserir = async (produto) => {
    produto.id = autoIncrement++;
    listaProdutos.push(produto);
    return Promise.resolve(produto);
}

export const buscarPorId = async (id) => {
    const produto = listaProdutos.find(p => p.id == id);
    return Promise.resolve(produto);
}

export const findIndexById = (id) => {
    return listaProdutos.findIndex(p => p.id == id);
}

// O atualizar é crucial para o compra_service
export const  atualizar = async (id, produtoAtualizado) => {
    const index = findIndexById(id);
    if (index >= 0) {
        produtoAtualizado.id = parseInt(id);
        listaProdutos[index] = produtoAtualizado;
        return Promise.resolve(listaProdutos[index]);
    }
    return Promise.resolve(undefined);
}

export const deletar = async (id) => {
    const index = findIndexById(id);
    if (index >= 0) {
        const produtoRemovido = listaProdutos.splice(index, 1)[0];
        return Promise.resolve(produtoRemovido);
    }
    return Promise.resolve(undefined);
}
