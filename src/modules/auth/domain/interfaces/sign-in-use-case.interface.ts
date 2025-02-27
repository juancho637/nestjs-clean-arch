import { AuthType, SignInType } from '../types';

export interface SignInUseCaseInterface<Entity extends AuthType = AuthType> {
  run(userFilters: SignInType): Promise<Entity>;
}
