import { z } from 'zod';

export class GetUserByIdTool {
  name = 'get_user_by_id';

  inputSchema = z.object({
    id: z.string(),
  });

  constructor(private readonly userService: any) {} // puedes inyectar lo que necesites

  async handler({ id }: { id: string }) {
    const user = await this.userService.findById(id);
    return {
      content: [{ type: 'text', text: `Usuario: ${user.name}` }],
    };
  }
}
