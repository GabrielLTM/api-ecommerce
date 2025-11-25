import { getUserProfile, getAll } from '../services/user_service.js';

export const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await getUserProfile(userId);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(user);
  } catch (err) {
    console.log("Erro ao buscar o perfil por ID: ", err)
    res.status(500).json({ message: 'Erro ao buscar perfil' });
  }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await getAll();
        res.json(users);
    } catch (err) {
        console.log("Erro ao buscar todos os usuários: ", err)
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
};
