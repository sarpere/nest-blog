import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @Length(8, 30)
  password: string;

  @Field()
  @IsNotEmpty()
  @Length(8, 30)
  confirm: string;
}
