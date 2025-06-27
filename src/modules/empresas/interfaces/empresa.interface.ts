
export interface Empresa {
  name: string;
  id: string;
  cnpj: string;
  plano: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  IncicioPlano?: Date;
  FimPlano?: Date;
}