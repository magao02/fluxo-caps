import { Empresa } from "@modules/empresas/interfaces/empresa.interface";

export interface Produto {
  name: string;
  id: string;
  price: number;
  empresaId?: string;
  empresa?: Empresa
}