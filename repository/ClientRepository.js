import { clients } from '../../database/index.js';

let idCounter = 1;

export const saveClient = async (client) => {
    const newClient = { ...client, id: idCounter++.toString() };
    clients.push(newClient);
    return newClient;
}

export const findAllClients = async () => {
    return clients;
}

export const findClientById = async (id) => {
    return clients.find(client => client.id === id);
}

export const findClientByEmail = async (email) => {
    return clients.find(client => client.email === email);
}

export const findClientByCpf = async (cpf) => {
    return clients.find(client => client.cpf === cpf);
}

export const updateClient = async (id, client) => {
    const index = clients.findIndex(c => c.id === id);
    if (index !== -1) {
        clients[index] = { ...clients[index], ...client };
        return clients[index];
    }
    return null;
}

export const deleteClient = async (id) => {
    const index = clients.findIndex(c => c.id === id);
    if (index !== -1) {
        const deletedClient = clients.splice(index, 1);
        return deletedClient[0];
    }
    return null;
}
