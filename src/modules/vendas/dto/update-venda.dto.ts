import { PartialType, OmitType } from '@nestjs/swagger';

import { CreateVendaDto } from './create-venda.dto';

export class UpdateVendaDto extends PartialType(OmitType(CreateVendaDto, ['products'])) {}
