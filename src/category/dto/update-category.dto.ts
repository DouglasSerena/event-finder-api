import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCategotyDto {
  @IsString() description: string;
  @IsString() icon: string;
  @IsArray() tags: string[];
}
