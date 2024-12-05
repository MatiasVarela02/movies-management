import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesGuard } from '../auth/roles/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Module({
  imports: [SequelizeModule.forFeature([Movie])],
  controllers: [MoviesController],
  providers: [MoviesService, AuthGuard('jwt'), RolesGuard],
  exports: [],
})
export class MoviesModule {}
