export class CreateVendaDto {
  client: string;
  price: number;
  date: Date;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  deliveryStatus: string;
  deliveryDate: Date;
  deliveryAddress: string;
  deliveryTracking: string;
  productsDto: {
    id: string;
    quantidade: number;
  }[];
}
