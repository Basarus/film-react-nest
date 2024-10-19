import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Film } from '../films/film.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Film') private filmModel: Model<Film>) {}

  async create(orderDto: CreateOrderDto) {
    const film = await this.filmModel.findById(orderDto.filmId);

    if (!film) {
      throw new NotFoundException('Film not found');
    }

    const session = film.schedule.find(s => s.id === orderDto.sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    const takenSeats = session.taken || [];

    // Проверяем, занято ли кресло
    for (const ticket of orderDto.tickets) {
      const seatIdentifier = `${ticket.row}:${ticket.seat}`;
      if (takenSeats.includes(seatIdentifier)) {
        throw new ConflictException(`Seat ${seatIdentifier} is already taken`);
      }
      takenSeats.push(seatIdentifier); // Добавляем занятое место
    }

    // Обновляем информацию о сеансе
    await this.filmModel.updateOne(
      { _id: orderDto.filmId, 'schedule.id': orderDto.sessionId },
      { $set: { 'schedule.$.taken': takenSeats } },
    );

    return {
      total: orderDto.tickets.length,
      items: orderDto.tickets.map(ticket => ({
        film: orderDto.filmId,
        session: orderDto.sessionId,
        daytime: session.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: session.price,
      })),
    };
  }
}
