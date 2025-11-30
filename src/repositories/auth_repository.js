import { findUserByEmail as findUserByEmailRepo, createUser as createUserRepo } from './user_repository.js';

export const findUserByEmail = async (email) => {
  return await findUserByEmailRepo(email);
};

export const createUser = async (name, email, password) => {
  return await createUserRepo({ name, email, password });
};
