import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  Logger,
  Inject,
} from '@nestjs/common';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'; // Se usa la librería oficial de MCP :contentReference[oaicite:0]{index=0}&#8203;:contentReference[oaicite:1]{index=1}
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { z } from 'zod';

@Injectable()
export class McpService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(McpService.name);
  private server: McpServer;

  constructor(
    @Inject('MCP_OPTIONS')
    private options: { serverName?: string; version?: string },
  ) {
    // Se crea el servidor MCP con los parámetros de configuración
    this.server = new McpServer({
      name: this.options.serverName || 'NestMCPServer',
      version: this.options.version || '1.0.0',
    });
    // Se registran algunas herramientas por defecto
    this.registerDefaultTools();
  }

  onModuleInit() {
    this.logger.log('MCP Server inicializado.');
    // Aquí se puede iniciar automáticamente el transporte por stdio o similar si es necesario.
  }

  async onModuleDestroy() {
    await this.server.close();
    this.logger.log('MCP Server desconectado.');
  }

  private registerDefaultTools() {
    // Ejemplo: herramienta "add" que suma dos números usando zod para validar la entrada.
    this.server.tool(
      'add',
      { a: z.number(), b: z.number() },
      async ({ a, b }) => ({
        content: [{ type: 'text', text: String(a + b) }],
      }),
    );
    // Aquí podrías agregar más herramientas, recursos o prompts según necesidad.
  }

  /**
   * Conecta un transporte SSE al servidor MCP.
   * @param res Objeto Response de Express (o adaptador HTTP de NestJs)
   * @param endpointPath Ruta utilizada por el transporte SSE para enviar mensajes.
   * @returns Promesa que resuelve con el sessionId asignado al transporte.
   */
  async connectSse(
    res: any,
    endpointPath: string,
  ): Promise<SSEServerTransport> {
    const transport = new SSEServerTransport(endpointPath, res);
    await this.server.connect(transport);
    this.logger.log(
      `Transporte SSE conectado. sessionId: ${transport.sessionId}`,
    );
    return transport;
  }

  /**
   * Retorna el MCPServer para acciones o configuración adicional.
   */
  getMcpServer(): McpServer {
    return this.server;
  }
}
