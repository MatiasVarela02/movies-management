import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional, IsBoolean } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Star Wars Episode IV: A New Hope',
    description: 'The title of the movie',
  })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'A space adventure',
    description: 'The description of the movie',
  })
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'George Lucas',
    description: 'The director of the movie',
  })
  director?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({
    example: '1977-05-25',
    description: 'The release date of the movie',
  })
  releaseDate?: Date;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: true,
    description: 'The availability of the movie',
  })
  isAvailable?: boolean;
}
