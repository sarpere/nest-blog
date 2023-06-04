import { Module } from '@nestjs/common';
import { AuthModule } from './auth/services/auth.module';
import { ConfigModule } from './config.module';
import { TypeOrmModule } from './typeorm.module';
import { GraphqlModule } from './graphql.module';

@Module({
  imports: [ConfigModule, AuthModule, TypeOrmModule, GraphqlModule],
  exports: [ConfigModule, AuthModule, TypeOrmModule, GraphqlModule],
})
export class CommonModule {}
