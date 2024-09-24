import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Aplicação de Monitoramento de Portfólios em execução!';
  }
}
