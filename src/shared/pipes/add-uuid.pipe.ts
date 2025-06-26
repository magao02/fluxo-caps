import { Injectable, PipeTransform } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AddUUID implements PipeTransform {
  transform(value: any) {
    value.id = uuidv4();
    return value;
  }
}
