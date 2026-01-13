import { ID } from "../types/id";
import { Roles } from "../enums/roles";

export interface IUser {
  id: ID;
  name: string;
  email: string;
  role: Roles;
  isActive: boolean;
}