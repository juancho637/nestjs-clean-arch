import { Injectable, Inject } from '@nestjs/common';
import { FindByUserUseCase } from '@modules/users/application';
import { TokenServiceInterface } from '@common/adapters/token/domain';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import { ForgotPasswordDto } from '../infrastructure/dto/forgot-password.dto';
import { FilterRuleEnum } from '@common/helpers/domain';

export class ForgotPasswordUseCase {
  private readonly context = ForgotPasswordUseCase.name;

  constructor(
    private readonly findByUserUseCase: FindByUserUseCase,
    private readonly tokenService: TokenServiceInterface,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(
    dto: ForgotPasswordDto,
    requestId: string,
  ): Promise<{ resetToken: string; expiresIn: number }> {
    const { email } = dto;

    // Verifica si existe un usuario con el email
    const user = await this.findByUserUseCase.run({
      filter: { property: 'email', rule: FilterRuleEnum.EQUALS, value: email },
    });

    if (!user) {
      throw this.exception.badRequestException({
        message: {
          codeError: 'FORGOT_01',
          message: 'User with provided email does not exist',
        },
        context: this.context,
      });
    }

    // Genera un token para resetear la contraseña, por ejemplo agregando una claim 'reset: true'
    const { token: resetToken, tokenExpiration } =
      this.tokenService.generateToken({ sub: user.id });

    this.logger.log({
      message: `Password reset token generated for user id=${user.id}`,
      context: this.context,
    });

    // Aquí se podría integrar un servicio de email para enviar el token al usuario.
    // Por ahora, retornamos el token en la respuesta para facilitar la prueba.
    return { resetToken, expiresIn: tokenExpiration };
  }
}
