import { InputType, Int, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { CreateTagInput } from 'src/tags/dto/create-tag.input';

@InputType()
export class CreatePostInput {
  @Field()
  content: string;

  @Field(() => [CreateTagInput])
  @IsOptional()
  tags: CreateTagInput[];

  @Field(() => Int)
  UserId: number;
}
