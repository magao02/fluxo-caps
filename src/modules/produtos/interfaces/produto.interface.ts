import { Empresa } from "@modules/empresas/interfaces/empresa.interface";

export interface Produto {
  name: string;
  id: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  empresaId?: string;
  empresa?: Empresa
}