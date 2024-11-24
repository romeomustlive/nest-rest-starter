import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { SortOrder } from '../types';
import { DEFAULT_SORT_FIELD } from '../constants';

export class PaginatedListQueryDto {
  @IsOptional()
  readonly order?: SortOrder = SortOrder.ASC;

  @IsString()
  readonly sortField?: string = DEFAULT_SORT_FIELD;

  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(10)
  @Max(50)
  readonly size?: number = 10;

  get skip() {
    return (this.page - 1) * this.size;
  }
}
