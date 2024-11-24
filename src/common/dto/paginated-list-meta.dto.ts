import { PaginatedListMetaDtoParameters } from '../types';

export class PaginatedListMetaDto {
  readonly page: number;
  readonly size: number;
  readonly itemCount: number;
  readonly pageCount: number;
  readonly hasPreviosPage: boolean;
  readonly hasNextPage: boolean;

  constructor({
    paginatedListQueryDto,
    itemCount,
  }: PaginatedListMetaDtoParameters) {
    this.page = paginatedListQueryDto.page;
    this.size = paginatedListQueryDto.size;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.size);
    this.hasPreviosPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
