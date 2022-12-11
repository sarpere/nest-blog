import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTagInput {
  @Field()
  tag: number;
}
