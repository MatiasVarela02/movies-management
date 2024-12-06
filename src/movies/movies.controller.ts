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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('movies')
@ApiBearerAuth()
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all movies', description: 'Retrieve a list of all movies.' })
  @ApiResponse({
    status: 200,
    description: 'List of movies successfully retrieved.',
    type: [Movie],
    examples: {
      success: {
        summary: 'Successful response',
      value: [
        {
          id: 1,
          title: 'Star Wars Episode IV: A New Hope',
          description: 'A space adventure',
          director: 'George Lucas',
          releaseDate: '1977-05-25',
          isAvailable: true,
        },
        {
          id: 2,
          title: 'The Lord of the Rings The Fellowship of the Ring',
          description: 'A fantasy epic',
          director: 'Peter Jackson',
          releaseDate: '2001-12-19',
          isAvailable: true,
        },
      ],
      } 
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized. JWT token is required.' })
  async findAll(): Promise<Movie[]> {
    const movies = await this.moviesService.findAll();
    return movies;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.REGULAR)
  @ApiOperation({ summary: 'Get movie by ID', description: 'Retrieve details of a specific movie by its ID. Accessible to regular users.' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the movie.', type: Number })
  @ApiResponse({ status: 200, description: 'Movie details retrieved successfully.', type: Movie,
    examples: {
      success: {
        summary: 'Successful response',
        value: {
          id: 1,
          title: 'Star Wars Episode IV: A New Hope',
          description: 'A space adventure',
          director: 'George Lucas',
          releaseDate: '1977-05-25',
          isAvailable: true,
        },
      },
    }
   })
  @ApiResponse({ status: 401, description: 'Unauthorized. JWT token is required.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
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
  @ApiOperation({ summary: 'Create a new movie', description: 'Allows admins to create a new movie.' })
  @ApiBody({ description: 'Details of the new movie to create.', type: CreateMovieDto })
  @ApiResponse({ status: 201, description: 'Movie created successfully.', type: Movie,
    examples: {
      success: {
        summary: 'Successful response',
        value: {
          id: 1,
          title: 'Star Wars Episode IV: A New Hope',
          description: 'A space adventure',
          director: 'George Lucas',
          releaseDate: '1977-05-25',
          isAvailable: true,
        },
      },
    }
   })
  @ApiResponse({ status: 401, description: 'Unauthorized. JWT token is required.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = await this.moviesService.create(createMovieDto);
    return movie;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRoleEnum.ADMIN)
  @ApiOperation({ summary: 'Update a movie', description: 'Allows admins to update an existing movie by its ID.' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the movie.', type: Number })
  @ApiBody({ description: 'Details to update in the movie.', type: UpdateMovieDto })
  @ApiResponse({
    status: 200,
    description: 'Movie updated successfully.',
    examples: {
      success: {
        summary: 'Successful response',
        value: { message: 'Movie updated successfully' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized. JWT token is required.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
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
  @ApiOperation({ summary: 'Delete a movie', description: 'Allows admins to delete a movie by its ID.' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the movie.', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Movie deleted successfully.',
    examples: {
      success: {
        summary: 'Successful response',
        value: { message: 'Movie deleted successfully' },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized. JWT token is required.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Insufficient permissions.' })
  @ApiResponse({ status: 404, description: 'Movie not found.' })
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
