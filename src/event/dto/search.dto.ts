import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SearchDto {
  @IsNotEmpty()
  @IsString()
  query: string;

  @IsArray()
  categoriesId: string[] = [];

  @IsNumber()
  limit = 10;
}
