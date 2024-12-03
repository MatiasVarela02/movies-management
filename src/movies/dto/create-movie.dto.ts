import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsDate()
  @IsNotEmpty()
  releaseDate: Date;
}