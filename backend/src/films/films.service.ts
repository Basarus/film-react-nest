import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film } from './film.schema';
import { CreateFilmDto } from './dto/create-film.dto';

@Injectable()
export class FilmsService {
    constructor(@InjectModel('Film') private filmModel: Model<Film>) { }

    async findAll(): Promise<Film[]> {
        return this.filmModel.find().exec();
    }

    async findScheduleByFilmId(id: string): Promise<any[]> {
        const film = await this.filmModel.findById(id);
        return film ? film.schedule : [];
    }

    async create(createFilmDto: CreateFilmDto): Promise<Film> {
        const createdFilm = new this.filmModel(createFilmDto);
        return createdFilm.save();
    }
}