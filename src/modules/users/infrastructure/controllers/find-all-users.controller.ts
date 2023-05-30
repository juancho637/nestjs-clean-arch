import { Controller } from '@nestjs/common';
import {
  UserTypeOrmRepository,
  FindAllUsersUseCase,
} from '@ecommerce/modules/users';

@Controller()
export class FindAllUsersController {
  private readonly useCase: FindAllUsersUseCase;

  constructor(private readonly userTypeOrmRepository: UserTypeOrmRepository) {
    this.useCase = new FindAllUsersUseCase(this.userTypeOrmRepository);
  }

  run() {
    return this.useCase.run();
  }
}
