import { Injectable, Inject } from '@nestjs/common';
import { FindByUserUseCase } from '@modules/users/application';
import { StoreUserUseCase } from '@modules/users/application/store-user.use-case';
import { TokenServiceInterface } from '@common/adapters/token/domain';
import { HashServiceInterface } from '@common/adapters/hash/domain';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import { SignUpDto } from '../infrastructure/dto/sign-up.dto';
import { AuthType, authErrorsCodes } from '../domain';
import { FilterRuleEnum } from '@common/helpers/domain';

export class SignUpUseCase {
  private readonly context = SignUpUseCase.name;

  constructor(
    private readonly findByUserUseCase: FindByUserUseCase,
    private readonly storeUserUseCase: StoreUserUseCase,
    private readonly tokenService: TokenServiceInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(signUpDto: SignUpDto, requestId: string): Promise<AuthType> {
    const { username, email, password, name } = signUpDto;

    try {
      this.logger.log({
        message: `Start SignUpUseCase for ${email} and ${username}`,
        context: this.context,
        requestId,
      });

      // Verifica si existe el usuario (por username o email)
      let existingUser = await this.findByUserUseCase.run({
        filter: {
          property: 'username',
          rule: FilterRuleEnum.EQUALS,
          value: username,
        },
      });

      if (existingUser) {
        throw this.exception.badRequestException({
          message: {
            codeError: 'SIGNUP_01',
            message: 'Username already exists',
          },
          context: this.context,
        });
      }

      existingUser = await this.findByUserUseCase.run({
        filter: {
          property: 'email',
          rule: FilterRuleEnum.EQUALS,
          value: email,
        },
      });

      if (existingUser) {
        throw this.exception.badRequestException({
          message: { codeError: 'SIGNUP_02', message: 'Email already exists' },
          context: this.context,
        });
      }

      // Crea el usuario mediante el caso de uso existente
      const createdUser = await this.storeUserUseCase.run(
        {
          name,
          username,
          email,
          password,
          // Puedes definir roles y permisos por defecto o dejarlos vacíos
        },
        requestId,
      );

      // Genera el token para el nuevo usuario
      const { token, tokenExpiration } = this.tokenService.generateToken({
        sub: createdUser.id,
      });

      this.logger.log({
        message: `End SignUpUseCase for ${email} and ${username}`,
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
}
