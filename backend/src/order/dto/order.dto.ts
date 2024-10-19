export class CreateOrderDto {
    email: string;
    phone: string;
    tickets: { row: number; seat: number }[];
    filmId: string;
    sessionId: string;
  }