import { FindByUserUseCase } from '@modules/users/application';
import { TokenServiceInterface } from '@common/adapters/token/domain';
import { HashServiceInterface } from '@common/adapters/hash/domain';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import { AuthType, SignInType, authErrorsCodes } from '../domain';
import { BaseUseCaseInterface, FilterRuleEnum } from '@common/helpers/domain';

export class SignInUseCase
  implements BaseUseCaseInterface<SignInType, AuthType>
{
  private readonly context = SignInUseCase.name;

  constructor(
    private readonly findByUserUseCase: FindByUserUseCase,
    private readonly tokenService: TokenServiceInterface,
    private readonly hashService: HashServiceInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(
    { username, password }: SignInType,
    requestId: string,
  ): Promise<AuthType> {
    try {
      const usernameType = this.isValidEmail(username) ? 'email' : 'username';

      this.logger.log({
        message: `Sign in with ${usernameType} ${username}`,
        context: this.context,
        requestId,
      });

      const user = await this.findByUserUseCase.run({
        filter: {
          property: usernameType,
          rule: FilterRuleEnum.EQUALS,
          value: username,
        },
      });

      if (!user) {
        throw this.exception.badRequestException({
          message: authErrorsCodes.AM012,
          context: this.context,
        });
      }

      if (!(await this.hashService.compare(password, user.password))) {
        throw this.exception.badRequestException({
          message: authErrorsCodes.AM012,
          context: this.context,
        });
      }

      const { token, tokenExpiration } = this.tokenService.generateToken({
        sub: user.id,
      });

      this.logger.log({
        message: `User with id=${user.id} signed in`,
        context: this.context,
        requestId,
      });

      return {
        accessToken: token,
        expiresIn: tokenExpiration,
        tokenType: 'Bearer',
      };
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: authErrorsCodes.AM010,
        context: this.context,
        error,
      });
    }
  }

  private isValidEmail(email: string): boolean {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email.toLowerCase());
  }
}
