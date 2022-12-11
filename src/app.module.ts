import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [ PostsModule, GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: 'schema.gql',
  })
],
})
export class AppModule {}
