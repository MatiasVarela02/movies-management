import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/sequelize';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie) private readonly movieModel: typeof Movie,
    private readonly httpService: HttpService,
  ) {}

  async synchronizeStarWarsMovies() {
    const url = 'https://swapi.dev/api/films/';
    const response = await firstValueFrom(this.httpService.get(url));
    const starWarsMovies = response.data.results;

    const movies = starWarsMovies.map((movie) => ({
      title: movie.title,
      director: movie.director,
      releaseDate: movie.release_date,
    }));

    for (const movie of movies) {
      const existingMovie = await this.movieModel.findOne({
        where: { title: movie.title },
      });
      if (!existingMovie) {
        await this.movieModel.create(movie);
      }
    }
  }

  findAll(): Promise<Movie[]> {
    return this.movieModel.findAll();
  }

  async findById(id: number): Promise<Movie> {
    const movie = await this.movieModel.findByPk(id);
    if (!movie) throw new Error('Movie not found');
    return movie;
  }

  create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return this.movieModel.create(createMovieDto);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<void> {
    const movie = await this.movieModel.findByPk(id);
    if (!movie) throw new Error('Movie not found');
    await this.movieModel.update(updateMovieDto, { where: { id } });
  }

  async delete(id: number): Promise<void> {
    const movie = await this.movieModel.findByPk(id);
    if (!movie) throw new Error('Movie not found');
    await this.movieModel.destroy({ where: { id } });
  }
}
