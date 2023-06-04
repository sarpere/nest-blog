import { Module } from '@nestjs/common';
import { TypeOrmModule as TypeormModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeormModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      synchronize: true,
    }),
  ],
})
export class TypeOrmModule {}
