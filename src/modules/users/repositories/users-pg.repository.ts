import { UUID } from "crypto";

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from "../entities/user-pg.entity";

import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersRepositoryTypeorm extends UsersRepository {
  constructor(@InjectRepository(User)
      private readonly repo: Repository<User>,) {
    super();
  }
  create(user: User): Promise<User> {
    const newUser = this.repo.create(user);
    return this.repo.save(newUser);
  }
  findAll(): Promise<User[]> {
    return this.repo.find({
      relations: ['empresa'], // Include relations if needed
    });
  }
  findOne(id: UUID): Promise<User> {
    return this.repo.findOne({
      where: { id },
      relations: ['empresa'], // Include relations if needed
    });
  }
  update(id: UUID, user: Partial<User>): Promise<User> {
    return this.repo.save({ ...user, id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({
      where: { email },
      relations: ['empresa'], // Include relations if needed
    });
  }
  
}