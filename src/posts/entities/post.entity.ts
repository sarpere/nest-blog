import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Tag } from '../../tags/entities/tag.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  content: string;

  @Field((type) => [Tag], { nullable: true })
  @ManyToMany(() => Tag, (tags) => tags.tag, {
    cascade: true,
    lazy: true,
  })
  @JoinTable()
  tags: Promise<Tag[]>;

  @Field((type) => User, { nullable: false })
  @ManyToOne(() => User, (author: User) => author.posts, { lazy: true })
  author: Promise<User>;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}
