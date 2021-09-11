import {
  IsArray,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';

const validateIsArrayString = (value: any[]) =>
  value.find((_) => typeof _ === 'string');

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @Validate(validateIsArrayString)
  helperTags: string[];

  @IsArray()
  @Validate(validateIsArrayString)
  images: string[];

  @IsArray()
  @Validate(validateIsArrayString)
  categoriesId: string[];

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;
}
