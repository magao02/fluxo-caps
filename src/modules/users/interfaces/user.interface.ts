import { UUID } from 'crypto';

export interface User {
  name: string;
  email: string;
  age: number;
  id: UUID;
  isDeleted: boolean;
}
