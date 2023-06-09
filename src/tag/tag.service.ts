import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private tagServiceRepository: Repository<Tag>,
  ) {}
  create(createTagDto: CreateTagDto) {
    return this.tagServiceRepository.save(createTagDto);
  }

  findAll() {
    return this.tagServiceRepository.find();
  }

  findOne(id: number) {
    return this.tagServiceRepository.findOneBy({ id });
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    return await this.tagServiceRepository.update(id, updateTagDto);
  }

  async remove(id: number) {
    return await this.tagServiceRepository.delete({ id });
  }
}
