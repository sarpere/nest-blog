import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Length } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  @Length(8, 30)
  password: string;

  @Field()
  @Column()
  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
  }
}
