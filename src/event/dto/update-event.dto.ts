import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsOptional() @IsString() name: string;
  @IsOptional() @IsString() description: string;
  @IsOptional() @IsArray() tags: string[];
  @IsOptional() @IsArray() helperTags: string[];
  @IsOptional() @IsArray() images: string[];
  @IsOptional() location: {
    latitude: number;
    longitude: number;
  };
}
