import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Star Wars Episode IV: A New Hope',
    description: 'The title of the movie',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'A space adventure',
    description: 'The description of the movie',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'George Lucas',
    description: 'The director of the movie',
  })
  director: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    example: '1977-05-25',
    description: 'The release date of the movie',
  })
  releaseDate: Date;
}