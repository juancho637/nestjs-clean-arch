import { DynamicModule, Global, Module } from '@nestjs/common';
import { McpService } from './mcp.service';
import { McpController } from './mcp.controller';

@Global()
@Module({})
export class McpModule {
  static forRoot(options?: {
    serverName?: string;
    version?: string;
  }): DynamicModule {
    return {
      module: McpModule,
      providers: [
        {
          provide: 'MCP_OPTIONS',
          useValue: options || {},
        },
        McpService,
      ],
      exports: [McpService],
      controllers: [McpController],
    };
  }
}
