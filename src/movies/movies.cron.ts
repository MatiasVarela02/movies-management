import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MoviesService } from './movies.service';

@Injectable()
export class MoviesCron {
  constructor(private readonly moviesService: MoviesService) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async handleCron() {
    await this.moviesService.synchronizeStarWarsMovies();
  }
}
