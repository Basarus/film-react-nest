import { Schema, Document } from 'mongoose';

export interface Film extends Document {
  title: string;
  description: string;
  schedule: { id: string; daytime: string; hall: string; rows: number; seats: number; price: number; taken: string[] }[];
  image: string; // Путь к афише
}

export const FilmSchema = new Schema<Film>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  schedule: [{
    id: { type: String, required: true },
    daytime: { type: String, required: true },
    hall: { type: String, required: true },
    rows: { type: Number, required: true },
    seats: { type: Number, required: true },
    price: { type: Number, required: true },
    taken: { type: [String], default: [] },
  }],
  image: { type: String, required: true },
});