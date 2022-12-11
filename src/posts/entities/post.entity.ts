import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  tags: string;
}
