import { Injectable } from '@nestjs/common';
import { Film, FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async getAllFilms(): Promise<Film[]> {
    return this.filmsRepository.findAll();
  }

  async getFilmSchedule(id: string): Promise<Film['schedule']> {
    const film = await this.filmsRepository.findById(id);
    return film.schedule;
  }
}
