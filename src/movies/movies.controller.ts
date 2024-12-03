import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { Movie } from './entities/movie';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(): Movie[] {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findById(@Param('id',ParseIntPipe) id: number): Movie {
    return this.moviesService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createMovieDto: CreateMovieDto,
  ): Movie {
    return this.moviesService.create(createMovieDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.delete(id);
  }
}
