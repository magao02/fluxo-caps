import { UUID } from 'crypto';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    age: number;

    @Prop({ required: true, unique: true, index: true })
    id: UUID;

    @Prop({ default: false })
    isDeleted: boolean;
}

export const UserMongoSchema = SchemaFactory.createForClass(User);
