import { Empresa } from "@modules/empresas/interfaces/empresa.interface";

import { PaymentStatus, OrderStatus, DeliveryCompany } from '../enums/venda.enums';

import { VendaProduto } from "./venda-produto.interface";

export interface Venda {
  id: string;
  pedido: string;
  cliente: string;
  numero: string;
  price: number;
  date: Date;
  status: OrderStatus;
  products: VendaProduto[];
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  deliveryCompany: DeliveryCompany;
  deliveryDate?: Date;
  deliveryAddress?: string;
  trackingCode?: string;
  empresa: Empresa;
}