import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: []
})
export class MoviesModule {}
