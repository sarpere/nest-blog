import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from 'src/common/auth/services/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}
  create(createUserInput: CreateUserInput): Promise<User> {
    const user = new User();
    user.firstName = createUserInput.firstName;
    user.lastName = createUserInput.lastName;
    user.email = createUserInput.email;
    user.password = createUserInput.password;
    return this.usersRepository.save(user);
  }

  async findAll() {
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

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }
  async loginUser(loginUserInput: LoginUserInput) {
    const user = await this.authService.validateUser(
      loginUserInput.email,
      loginUserInput.password,
    );
    if (!user) {
      throw new BadRequestException(`Email or password are invalid`);
    } else {
      return this.authService.generateUserCredentials(user);
    }
  }
}
