import { Controller, Get, Inject } from '@nestjs/common';
import { FindAllUsersUseCase } from '../../application';
import { UserRepository } from '../../domain';

@Controller()
export class FindAllUsersController {
  constructor(
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {
    this.findAllUsersUseCase = new FindAllUsersUseCase(this.userRepository);
  }

  @Get('api/users')
  async run() {
    return await this.findAllUsersUseCase.run();
  }
}
