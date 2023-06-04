import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';
import { CommonModule } from './common/common.module';
// TODO: when call a query related models not retriving.
@Module({
  imports: [CommonModule, TagsModule, PostsModule, UsersModule],
})
export class AppModule {}
