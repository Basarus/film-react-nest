import { Controller, Get, Param } from '@nestjs/common';

@Controller('api/afisha/films')
export class FilmsController {
  @Get()
  getAllFilms() {
    return { total: 0, items: [] };
  }

  @Get(':id/schedule')
  getFilmSchedule(@Param('id') id: string) {
    return { total: 0, items: [] };
  }
}