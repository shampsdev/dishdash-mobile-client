import { User } from './user.interface';

export interface SimpleUser extends Omit<User, "id" | "createdAt"> {}