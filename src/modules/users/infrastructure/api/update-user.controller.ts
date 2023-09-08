import {
  Body,
  Controller,
  Inject,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { UserUseCasesEnum } from '../../domain';
import { UpdateUserUseCase } from '../../application';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller()
export class UpdateUserController {
  constructor(
    @Inject(UserUseCasesEnum.UPDATE_USER_USECASE)
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Put('api/users/:id')
  async run(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.updateUserUseCase.run(id, updateUserDto);
  }
}
