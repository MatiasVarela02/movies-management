import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  findAll(): Movie[] {
    return null;
  }

  findById(id: number): Movie {
    return null;
  }

  create(createMovieDto: CreateMovieDto): Movie {
    return null;
  }

  update(id:number,updateMovieDto: UpdateMovieDto): Movie {
    return null;
  }

  delete(id:number) {
    return null;
  }
}
