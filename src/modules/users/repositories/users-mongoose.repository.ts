import { UUID } from 'crypto';

import { User } from '@modules/users/interfaces/user.interface';
import { User as UserMongo } from '@modules/users/repositories/user-mongo.schema';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class MongooseUsersRepository implements UsersRepository {
    constructor(
        @InjectModel(UserMongo.name)
        private readonly userModel: Model<UserMongo>,
    ) { }

    async create(user: User): Promise<User> {
        const createdUser = new this.userModel(user);
        await createdUser.save();
        return createdUser.toObject();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().lean();
    }

    async findOne(id: UUID): Promise<User> {
        return this.userModel.findOne({ id }).lean();
    }

    async update(id: UUID, user: Partial<User>): Promise<User> {
        return this.userModel.findOneAndUpdate({ id }, user, { new: true }).lean();
    }
}
