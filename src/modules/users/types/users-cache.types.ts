import { User } from '@modules/users/interfaces/user.interface';

export type UsersCache = {
  [key: string]: User;
};
