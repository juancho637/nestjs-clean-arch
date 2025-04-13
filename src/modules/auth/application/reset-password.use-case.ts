import { Injectable, Inject } from '@nestjs/common';
import { TokenServiceInterface } from '@common/adapters/token/domain';
import { HashServiceInterface } from '@common/adapters/hash/domain';
import { UpdateUserUseCase } from '@modules/users/application';
import { ResetPasswordDto } from '../infrastructure/dto/reset-password.dto';
import { ExceptionServiceInterface } from '@common/adapters/exception/domain';
import { LoggerServiceInterface } from '@common/adapters/logger/domain';

export class ResetPasswordUseCase {
  private readonly context = ResetPasswordUseCase.name;

  constructor(
    private readonly tokenService: TokenServiceInterface,
    private readonly hashService: HashServiceInterface,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly logger: LoggerServiceInterface,
    private readonly exception: ExceptionServiceInterface,
  ) {}

  async run(dto: ResetPasswordDto, requestId: string): Promise<void> {
    const { token, newPassword } = dto;

    try {
      // Verifica el token (si es inválido o ha expirado, se lanzará error)
      const decoded = this.tokenService.verifyToken(token);
      const userId = decoded.sub;
      // Encripta la nueva contraseña
      const hashedPassword = await this.hashService.hash(newPassword);
      // Actualiza la contraseña del usuario
      await this.updateUserUseCase.run(userId, { password: hashedPassword });
      this.logger.log({
        message: `Password updated for user id=${userId}`,
        context: this.context,
        requestId,
      });
    } catch (error) {
      throw this.exception.internalServerErrorException({
        message: { codeError: 'RESET_01', message: 'Failed to reset password' },
        context: this.context,
        error,
      });
    }
  }
}
