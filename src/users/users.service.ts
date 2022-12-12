import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  create(createUserInput: CreateUserInput): Promise<User> {
    const user = new User();
    user.firstName = createUserInput.firstName;
    user.lastName = createUserInput.lastName;
    user.email = createUserInput.email;
    user.password = createUserInput.password;
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    return this.usersRepository
      .createQueryBuilder()
      .update()
      .set({
        ...updateUserInput,
      })
      .where('id = :id', { id })
      .returning('*')
      .execute()
      .then((response) => response.raw[0]);
  }

  remove(id: number) {
    return this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute()
      .then((response) => response.raw[0]);
  }
}
