import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { TagsService } from 'src/tags/tags.service';
import { Inject } from '@nestjs/common';
import { Tag } from 'src/tags/entities/tag.entity';
import { UsersService } from 'src/users/users.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly tagsService: TagsService,
    private readonly usersService: UsersService,
  ) {}

  // TODO: When create a post tags not mapping for all tags.
  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    let tags: Tag[] = [];
    if (createPostInput.tags.length > 0) {
      await createPostInput.tags.map(async (tagModel) => {
        let tag: Tag = await this.tagsService.isExist(tagModel.tag);
        if (!tag) {
          tag = await this.tagsService.create(tagModel);
        }
        tags.push(tag);
      });
    }
    const author = await this.usersService.findOne(createPostInput.UserId);
    return this.postsService.create(createPostInput, author, tags);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }
}
