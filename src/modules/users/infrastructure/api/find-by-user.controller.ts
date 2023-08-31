import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FindByUserUseCase } from '../../application';

@Controller()
export class FindByUserController {
  constructor(private readonly findByUserUseCase: FindByUserUseCase) {}

  @Get('api/users/:id')
  async run(@Param('id', ParseIntPipe) id: number) {
    return this.findByUserUseCase.run(id);
  }
}
