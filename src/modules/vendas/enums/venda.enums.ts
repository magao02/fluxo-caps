export enum PaymentStatus {
  PENDENTE = "pendente",
  PARCIAL = "50_pago",
  COMPLETO = "100_pago",
}

export enum OrderStatus {
  FICHA_ENTREGUE = "ficha_entregue",
  EM_FABRICACAO = "em_fabricacao",
  ENVIADO = "enviado",
  POS_VENDA = "pos_venda",
}

export enum DeliveryCompany {
  CORREIOS = "correios",
  AZUL_CARGO = "azul_cargo",
  JADLOG = "jadlog",
}