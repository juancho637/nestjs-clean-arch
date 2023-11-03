import { Inject } from '@nestjs/common';
import { FindByUserUseCase } from '../../application';
import { UserUseCasesEnum } from '../../domain';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from '../persistence';

@Resolver(() => UserEntity)
export class FindByUserResolver {
  constructor(
    @Inject(UserUseCasesEnum.FIND_ONE_USER_USECASE)
    private readonly findByUserUseCase: FindByUserUseCase,
  ) {}

  @Query(() => UserEntity, { name: 'user' })
  async run(@Args('id', { type: () => ID }) id: number) {
    const user = await this.findByUserUseCase.run(id);

    return user;
  }
}
