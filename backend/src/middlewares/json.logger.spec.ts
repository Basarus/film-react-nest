import { Test, TestingModule } from '@nestjs/testing';
import { JsonLogger } from './json.logger'; // Путь к вашему логгеру

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let spy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonLogger],
    }).compile();

    logger = module.get<JsonLogger>(JsonLogger);
    spy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Мокаем консольный log
  });

  it('should format log message in JSON format', () => {
    const message = 'Test log message';
    const optionalParams = ['param1', 'param2']; // Передаем два отдельных параметра

    logger.log(message, ...optionalParams); // Используем spread для отдельных параметров

    expect(spy).toHaveBeenCalledWith(
      '{"level":"log","message":"Test log message","optionalParams":["param1","param2"]}',
    );
  });
});
