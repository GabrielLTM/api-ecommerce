import {
    saveClient,
    findAllClients,
    findClientById,
    findClientByEmail,
    findClientByCpf,
    updateClient as updateClientRepository,
    deleteClient as deleteClientRepository
} from "../repository/ClientRepository.js";

class ClientError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

export const createClient = async (client) => {
    const existingClientByEmail = await findClientByEmail(client.email);
    if (existingClientByEmail) {
        throw new ClientError('Email already registered', 400);
    }

    const existingClientByCpf = await findClientByCpf(client.cpf);
    if (existingClientByCpf) {
        throw new ClientError('CPF already registered', 400);
    }

    const newClient = await saveClient(client);
    return newClient;
}

export const getAllClients = async () => {
    return await findAllClients();
}

export const getClientById = async (id) => {
    if (id == null || id == 0) {
        throw new ClientError('Invalid client ID', 400);
    }
    const client = await findClientById(id);
    if (!client) {
        throw new ClientError('Client not found', 404);
    }
    return client;
}

export const updateClient = async (id, client) => {
    if (id == null || id == 0) {
        throw new ClientError('Invalid client ID', 400);
    }
    const existingClient = await findClientById(id);
    if (!existingClient) {
        throw new ClientError('Client not found', 404);
    }

    if (client.email && client.email !== existingClient.email) {
        const existingClientByEmail = await findClientByEmail(client.email);
        if (existingClientByEmail) {
            throw new ClientError('Email already registered', 400);
        }
    }

    if (client.cpf && client.cpf !== existingClient.cpf) {
        const existingClientByCpf = await findClientByCpf(client.cpf);
        if (existingClientByCpf) {
            throw new ClientError('CPF already registered', 400);
        }
    }

    return await updateClientRepository(id, client);
}

export const deleteClient = async (id) => {
    if (id == null || id == 0) {
        throw new ClientError('Invalid client ID', 400);
    }
    const existingClient = await findClientById(id);
    if (!existingClient) {
        throw new ClientError('Client not found', 404);
    }
    return await deleteClientRepository(id);
}
