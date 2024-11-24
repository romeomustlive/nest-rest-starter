import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from 'src/authentication/services/hashing.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { PaginatedListQueryDto } from 'src/common/dto/paginated-list-query.dto';
import { PaginatedListMetaDto } from 'src/common/dto/paginated-list-meta.dto';
import { PaginatedListDto } from 'src/common/dto/paginated-list.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async getAll(query: PaginatedListQueryDto) {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    queryBuilder
      .orderBy(`user.${query.sortField}`, query.order)
      .skip(query.skip)
      .take(query.size);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const meta = new PaginatedListMetaDto({
      itemCount,
      paginatedListQueryDto: query,
    });

    return new PaginatedListDto(entities, meta);
  }

  async getOne(id: string) {
    return await this.usersRepository.findOneByOrFail({ id: +id });
  }

  async create(createUserDto: CreateUserDto) {
    const hashingPassword = await this.hashingService.hash(
      createUserDto.password,
    );

    this.usersRepository.save({ ...createUserDto, hashingPassword });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneByOrFail({ id: +id });
    const hashingPassword = await this.hashingService.hash(
      updateUserDto.password,
    );

    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.hashingPassword = hashingPassword;
    user.role = updateUserDto.role;

    this.usersRepository.save(user);
  }

  async delete(id: string) {
    const user = await this.usersRepository.findOneByOrFail({ id: +id });
    this.usersRepository.delete(user);
  }
}
