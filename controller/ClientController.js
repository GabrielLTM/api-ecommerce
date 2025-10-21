import {
    createClient as createClientService,
    getAllClients as getAllClientsService,
    getClientById as getClientByIdService,
    updateClient as updateClientService,
    deleteClient as deleteClientService
} from "../services/ClientService.js";

export const createClient = async (req, res) => {
    try {
        const { name, cpf, email, phone, address } = req.body;
        if (!name || !cpf || !email || !phone || !address) {
            return res.status(400).json({ message: "The fields 'name', 'cpf', 'email', 'phone' and 'address' are mandatory." });
        }
        const client = { name, cpf, email, phone, address };
        const newClient = await createClientService(client);
        res.status(201).json(newClient);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
}

export const getClients = async (req, res) => {
    try {
        const clients = await getAllClientsService();
        res.status(200).json(clients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getClientById = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await getClientByIdService(id);
        res.status(200).json(client);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
}

export const updateClient = async (req, res) => {
    const { id } = req.params;
    try {
        const { name, cpf, email, phone, address } = req.body;
        const client = { name, cpf, email, phone, address };
        const updatedClient = await updateClientService(id, client);
        res.status(200).json(updatedClient);
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
}

export const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteClientService(id);
        res.status(204).send();
    } catch (err) {
        if (err.status) {
            return res.status(err.status).json({ message: err.message });
        }
        res.status(500).json({ message: err.message });
    }
}
