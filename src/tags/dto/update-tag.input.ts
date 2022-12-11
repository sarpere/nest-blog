import { CreateTagInput } from './create-tag.input';
import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTagInput extends CreateTagInput {
  @Field(() => ID)
  id: number;
}
