import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly PostRepository: Repository<Post>,
  ) {}
  async create(createPostInput: CreatePostInput, author: User, tags: Tag[]) {
    const post = new Post();
    post.content = createPostInput.content;
    post.author = Promise.resolve(author);
    post.tags = Promise.resolve(tags);

    return await this.PostRepository.save(post);
  }

  findAll() {
    return this.PostRepository.find();
  }

  findOne(id: number) {
    return this.PostRepository.findOne({ where: { id } });
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
