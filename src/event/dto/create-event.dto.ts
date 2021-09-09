import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty() @IsString() name: string;
  @IsString() description: string;
  @IsArray() tags: string[];
  @IsArray() helperTags: string[];
  @IsArray() images: string[];
  @IsNotEmpty() location: {
    latitude: number;
    longitude: number;
  };
}
