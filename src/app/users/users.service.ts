import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async findOneOrFail(id: string) {
    try {
      return await this.usersRepository.findOne({
        where: {
          id: Equal(id),
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneOrFailEmail(email: string) {
    try {
      return await this.usersRepository.findOne({
        where: {
          email: Equal(email),
        },
      });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  //   async findOneOrFail(options: FindOneOptions<UsersEntity>) {
  //     try {
  //       return await this.usersRepository.findOneOrFail(options);
  //     } catch (error) {
  //       throw new NotFoundException(error.message);
  //     }
  //   }

  async store(data: CreateUserDTO) {
    const user = await this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }

  async update(id: string, data: UpdateUserDTO) {
    const user = await this.findOneOrFail(id);
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }

  async destroy(id: string) {
    await this.usersRepository.findOne({
      where: {
        id: Equal(id),
      },
    });
    this.usersRepository.softDelete({ id });
  }
}
