// import { Injectable } from '@nestjs/common';
// import {} from '@modelcontextprotocol/sdk';
// import { z } from 'zod';
// import { UsersService } from '@modules/users/infrastructure';

// @Injectable()
// export class UsersContextFunctions {
//   constructor(private readonly usersService: UsersService) {}

//   getFunctions(): ContextFunction[] {
//     return [this.getUserById(), this.listUsers()];
//   }

//   private getUserById(): ContextFunction {
//     return createContextFunction({
//       name: 'get_user_by_id',
//       description: 'Obtiene un usuario por su ID',
//       inputSchema: z.object({ id: z.string() }),
//       handler: async ({ input }) => {
//         const user = await this.usersService.findById(input.id);
//         if (!user) throw new Error('Usuario no encontrado');
//         return user;
//       },
//     });
//   }

//   private listUsers(): ContextFunction {
//     return createContextFunction({
//       name: 'list_users',
//       description: 'Lista todos los usuarios',
//       inputSchema: z.object({}),
//       handler: async () => this.usersService.findAll(),
//     });
//   }
// }
