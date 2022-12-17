import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}
  create(createTagInput: CreateTagInput) {
    const tag = new Tag();
    tag.tag = createTagInput.tag;
    return this.tagRepository.save(tag);
  }

  findAll() {
    return this.tagRepository.find();
  }

  findOne(id: number) {
    return this.tagRepository.findOne({
      where: {
        id,
      },
    });
  }

  async isExist(name: string) {
    const tag = this.tagRepository.findOne({
      where: {
        tag: name,
      },
    });
    return tag;
  }

  update(id: number, updateTagInput: UpdateTagInput) {
    return this.tagRepository
      .createQueryBuilder()
      .update()
      .set({
        ...updateTagInput,
      })
      .where('id = :id', { id })
      .execute();
  }

  remove(id: number) {
    return this.tagRepository
      .createQueryBuilder()
      .delete()
      .from(Tag)
      .where('id = :id', { id })
      .execute();
  }
}
