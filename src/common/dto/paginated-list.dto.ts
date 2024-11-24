import { IsArray } from 'class-validator';
import { PaginatedListMetaDto } from './paginated-list-meta.dto';

export class PaginatedListDto<T> {
  @IsArray()
  readonly data: T[];

  readonly meta: PaginatedListMetaDto;

  constructor(data: T[], meta: PaginatedListMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
