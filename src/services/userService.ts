import { IUser } from "../interfaces/user";
import { ID } from "../types/id";
import { users } from "../data/users";

export function createUser(user: IUser): IUser {
  users.push(user);
  return user;
}

export function getUserById(id: ID): IUser | null {
  const user = users.find(u => u.id === id);
  return user ?? null;
}

export function updateUser(id: ID, data: Partial<IUser>): IUser | null {
  const user = getUserById(id);
  if (!user) return null;
  Object.assign(user, data);
  return user;
}

export function deleteUser(id: ID): boolean {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
}