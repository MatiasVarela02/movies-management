import { Test } from '@nestjs/testing';
import { MoviesService } from '../src/movies/movies.service';
import { getModelToken } from '@nestjs/sequelize';
import { Movie } from '../src/movies/entities/movie';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movie),
          useValue: {
            findByPk: jest.fn(),
            findAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            destroy: jest.fn(),
            bulkCreate: jest.fn(),
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
    httpService = module.get<HttpService>(HttpService);
    moviesService.movieModel.findByPk = jest.fn().mockResolvedValue(null);
  });

  describe('synchronizeStarWarsMovies', () => {
    beforeEach(() => {
      jest.spyOn(httpService, 'get').mockReturnValue(
        of({
          data: {
            results: [
              {
                title: 'Movie 1',
                director: 'Director 1',
                release_date: '2020-01-01',
              },
              {
                title: 'Movie 2',
                director: 'Director 2',
                release_date: '2020-02-02',
              },
            ],
          },
        }) as any,
      );
    });
    it('should get all movies from the star wars api', async () => {
      const url = 'https://swapi.dev/api/films/';
      moviesService.movieModel.findOne = jest.fn().mockResolvedValue(null);
      await moviesService.synchronizeStarWarsMovies();
      expect(moviesService.httpService.get).toHaveBeenCalledWith(url);
    });
    it('should add movies to the database if they do not exist', async () => {
      const moviesToCreate = [
        {
          title: 'Movie 1',
          director: 'Director 1',
          releaseDate: '2020-01-01',
        },
        {
          title: 'Movie 2',
          director: 'Director 2',
          releaseDate: '2020-02-02',
        },
      ];
      moviesService.movieModel.findOne = jest.fn().mockResolvedValue(null);
      await moviesService.synchronizeStarWarsMovies();
      expect(moviesService.movieModel.bulkCreate).toHaveBeenCalledWith(
        moviesToCreate,
      );
    });
    it('should not add movies to the database if they already exist', async () => {
      moviesService.movieModel.findOne = jest
        .fn()
        .mockResolvedValue({ title: 'Movie 1' });
      await moviesService.synchronizeStarWarsMovies();
      expect(moviesService.movieModel.bulkCreate).toHaveBeenCalledWith([]);
    });
  });
  describe('findById', () => {
    it('should throw an error if there is not movie with the given id', async () => {
      await expect(moviesService.findById(1)).rejects.toThrow(
        new Error('Movie not found'),
      );
    });
  });
  describe('update', () => {
    it('should throw an error if there is not movie with the given id', async () => {
      await expect(moviesService.update(1, {})).rejects.toThrow(
        new Error('Movie not found'),
      );
    });
  });
  describe('delete', () => {
    it('should throw an error if there is not movie with the given id', async () => {
      await expect(moviesService.delete(1)).rejects.toThrow(
        new Error('Movie not found'),
      );
    });
  });
});
