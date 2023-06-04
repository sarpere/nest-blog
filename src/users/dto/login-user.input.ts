import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field(() => String, { description: 'email of the user' })
  @IsString()
  @IsNotEmpty()
  email: string;
  @Field(() => String, { description: 'password of the user' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
