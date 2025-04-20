import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Query,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { McpService } from './mcp.service';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse';

@Controller('mcp')
export class McpController {
  // Objeto para almacenar la referencia a los transportes SSE activos
  private transports: { [sessionId: string]: SSEServerTransport } = {};

  constructor(private readonly mcpService: McpService) {}

  /**
   * Endpoint GET que establece la conexión SSE.
   * Se utiliza el método connectSse del servicio para conectar el transporte SSE.
   * La ruta de endpoint para los mensajes se pasa como parámetro (ejemplo: '/mcp/messages').
   */
  @Get('sse')
  async sse(
    @Req() req: Request,
    @Res() res: Response,
    @Query('sessionId') sessionId?: string,
  ): Promise<void> {
    try {
      // En este ejemplo se crea una nueva conexión SSE cada vez.
      const newSession = await this.mcpService.connectSse(res, '/mcp/messages');
      // Se almacena la referencia del transporte para futuros usos (por ejemplo, en el POST)
      this.transports[newSession.sessionId] = newSession;
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: (error as Error).message });
    }
  }

  /**
   * Endpoint POST para recibir mensajes del cliente.
   * El cliente debe enviar el sessionId para identificar su transporte SSE.
   */
  @Post('messages')
  async postMessage(
    @Req() req: Request,
    @Res() res: Response,
    @Query('sessionId') sessionId?: string,
  ): Promise<void> {
    const transport = this.transports[sessionId];

    if (!transport) {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send('No se encontró transporte para el sessionId proporcionado');
      return;
    }

    try {
      req.headers['content-type'] = 'text/plain';
      // await transport.handlePostMessage(
      //   { body: JSON.stringify({ text }) } as Request,
      //   res,
      //   JSON.parse(JSON.stringify({ text })),
      // );

      await transport.handlePostMessage(req, res);
    } catch (error) {
      if (!res.headersSent) {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send((error as Error).message);
      }
    }
  }
}
