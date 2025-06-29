import { Empresa } from "@modules/empresas/interfaces/empresa.interface";

import { VendaProduto } from "./venda-produto.interface";

export interface Venda {
  id: string;
  client: string;
  price: number;
  date: Date;
  status: string;
  products: VendaProduto[];
  paymentMethod: string;
  paymentStatus: string;
  deliveryStatus: string;
  deliveryDate: Date;
  deliveryAddress: string;
  deliveryTracking: string;
  empresa: Empresa;
}