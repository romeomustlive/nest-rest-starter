import { PaginatedListQueryDto } from '../dto/paginated-list-query.dto';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface PaginatedListMetaDtoParameters {
  paginatedListQueryDto: PaginatedListQueryDto;
  itemCount: number;
}
