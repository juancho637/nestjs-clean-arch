import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Si el cliente ya envía un request id, lo usamos; si no, generamos uno.
    const requestId = req.headers['x-request-id'] || uuidv4();

    // Adjuntamos el request id a los headers de la petición para que esté disponible en el ciclo de vida de la misma.
    req.headers['x-request-id'] = requestId;
    // Opcional: También lo agregamos en la respuesta para que el cliente pueda visualizarlo.
    res.setHeader('x-request-id', requestId as string);

    next();
  }
}
