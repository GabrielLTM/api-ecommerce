let listaCompras = [];
let autoIncrement = 1;

export function listar() {
    return Promise.resolve(listaCompras);
}

export function inserir(compra) {
    compra.id = autoIncrement++;
    listaCompras.push(compra);
    return Promise.resolve(compra);
}