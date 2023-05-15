import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Raw, Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookServiceRepository: Repository<Book>,
  ) {}
  create(createBookDto: CreateBookDto) {
    return this.bookServiceRepository.save(createBookDto);
  }

  findAll() {
    return this.bookServiceRepository.find();
  }

  findOne(id: number) {
    return this.bookServiceRepository.findOneBy({ id });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    return await this.bookServiceRepository.save(updateBookDto);
  }

  async remove(id: number) {
    return await this.bookServiceRepository.delete({ id });
  }

  findBooksFromAuthor(authorId: number) {
    return this.bookServiceRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.genre', 'genre')
      .leftJoinAndSelect('book.publisher', 'publisher')
      .leftJoinAndSelect('book.type', 'type')
      .leftJoinAndSelect('book.tags', 'tags')
      .leftJoinAndSelect('book.authors', 'authors')
      .leftJoin('book.authors', 'authorsForFilter')
      .where('authorsForFilter.id IN (:...authors)', { authors: [authorId] })
      .getMany();
  }

  findBooksFromTags(tagList: number[]) {
    return this.bookServiceRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.genre', 'genre')
      .leftJoinAndSelect('book.publisher', 'publisher')
      .leftJoinAndSelect('book.type', 'type')
      .leftJoinAndSelect('book.tags', 'tags')
      .leftJoinAndSelect('book.authors', 'authors')
      .leftJoin('book.tags', 'tagsForFilter')
      .where('tagsForFilter.id IN (:...tags)', { tags: tagList })
      .getMany();
  }

  findBooksFromGenres(genreList: number[]) {
    return this.bookServiceRepository.findBy({ genre: In(genreList) });
  }

  findBooksFromPublishers(publisherList: number[]) {
    return this.bookServiceRepository.findBy({ publisher: In(publisherList) });
  }

  findBooksFromTypes(typeList: number[]) {
    return this.bookServiceRepository.findBy({ type: In(typeList) });
  }
}
