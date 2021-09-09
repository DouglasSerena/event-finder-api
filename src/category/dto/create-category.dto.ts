import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty() @IsString() description: string;
  @IsNotEmpty() @IsString() icon: string;
  @IsArray() tags: string[];
}
