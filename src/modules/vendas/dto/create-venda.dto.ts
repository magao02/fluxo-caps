import { Transform, Type } from 'class-transformer';
import { IsString, IsNumber, IsDate, IsArray, IsEnum, IsOptional, IsDateString } from 'class-validator';

import { PaymentStatus, OrderStatus, DeliveryCompany } from '../enums/venda.enums';

export class CreateVendaDto {
  @IsString()
  pedido: string;

  @IsString()
  cliente: string;

  @IsString()
  numero: string;

  @IsNumber()
  price: number;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsString()
  paymentMethod: string;

  @IsEnum(PaymentStatus)
  paymentStatus: PaymentStatus;

  @IsEnum(DeliveryCompany)
  deliveryCompany: DeliveryCompany;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value === '' ? null : value)
  deliveryDate?: Date;

  @IsOptional()
  @Transform(({ value }) => value === '' ? null : value)
  @IsString()
  deliveryAddress?: string;

  @IsOptional()
  @Transform(({ value }) => value === '' ? null : value)
  @IsString()
  trackingCode?: string;

  @IsArray()
  products: {
    id: string;
      quantity: number;
    price: number;
  }[];
}