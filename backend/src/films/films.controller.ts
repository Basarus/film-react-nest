import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Film } from '../repository/films.repository';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getAllFilms(): Promise<Film[]> {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  async getFilmById(@Param('id') id: string): Promise<Film['schedule']> {
    return this.filmsService.getFilmSchedule(id);
  }
}
