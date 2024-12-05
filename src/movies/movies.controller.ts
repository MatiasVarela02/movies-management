import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Movie } from './entities/movie';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/roles/roles.decorator';
import { UserRoleEnum } from '../users/entities/user';
import { RolesGuard } from '../auth/roles/roles.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<Movie[]> {
    const movies = await this.moviesService.findAll();
    return movies;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.REGULAR)
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Movie> {
    try {
      const movie = await this.moviesService.findById(id);
      return movie;
    } catch (error) {
      throw new NotFoundException(error.message || 'Movie not found');
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = await this.moviesService.create(createMovieDto);
    return movie;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<{ message: string }> {
    try {
      await this.moviesService.update(id, updateMovieDto);
      return {
        message: 'Movie deleted successfully',
      };
    } catch (error) {
      throw new NotFoundException(error.message || 'Movie not found');
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    try {
      await this.moviesService.delete(id);
      return {
        message: 'Movie deleted successfully',
      };
    } catch (error) {
      throw new NotFoundException(error.message || 'Movie not found');
    }
  }
}
