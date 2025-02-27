import { BaseCustomException } from '@common/adapters/exception/infrastructure';

export type LoggerType = {
  context: string;
  message: BaseCustomException | string | object;
  trace?: string | object;
  requestId?: string;
};
