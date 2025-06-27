import { Empresa } from "@modules/empresas/interfaces/empresa.interface";

export interface User {
  name: string;
  email: string;
  password: string;
  id: string;
  isDeleted: boolean;
  empresaId?: string;
  empresa: Empresa
}
