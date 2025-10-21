import { getUser } from '../repository/UserRepository.js';

class UserError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export const getUserProfile = async (userId) => {
    if (userId == null || userId == 0){
        throw new UserError('ID do usuário inválido', 400);
    } 
  return getUser(userId);
}