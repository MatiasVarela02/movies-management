import { IsString, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  director?: string;

  @IsDate()
  @IsOptional()
  releaseDate?: Date;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;
}
