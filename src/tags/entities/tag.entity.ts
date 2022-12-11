import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Tag {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  tag: string;
}
