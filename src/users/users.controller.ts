import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateMovieDto } from '../movies/dto/create-movie.dto';
import { MoviesService } from '../movies/movies.service';
import { Movie } from '../movies/entities/movie';

@Controller('users')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createMovieDto: CreateMovieDto,
  ): Movie {
    return this.moviesService.create(createMovieDto);
  }

}
