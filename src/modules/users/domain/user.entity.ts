// export class UserEntity {
//   userId: UserIdValueObject;
//   name: NameValueObject;
//   email: EmailValueObject;
//   password: PasswordValueObject;
//   status: StatusValueObject;
//   role: RoleEntity;

//   constructor(user?: UserTypeGeneric) {
//     this.userId = new UserIdValueObject(user?.userId);
//     this.name = new NameValueObject(user?.name);
//     this.email = new EmailValueObject(user?.email);
//     this.password = new PasswordValueObject(user?.password);
//     this.status = new StatusValueObject(user?.status ?? true);
//     this.role = new RoleEntity(user?.role);

//     this.checkValidateValueObjects();
//   }

//   changeName(name: string): void {
//     this.name = new NameValueObject(name);
//   }

//   changeEmail(email: string): void {
//     this.email = new EmailValueObject(email);
//   }

//   changePassword(password: string): void {
//     this.password = new PasswordValueObject(password);
//   }

//   changeStatus(status: boolean): void {
//     this.status = new StatusValueObject(status);
//   }

//   changeRole(role: RoleType): void {
//     this.role = new RoleEntity(role);
//   }

//   createArrayFromValueObjects(): ValueObjectAbstract<any>[] {
//     const result = new Array<ValueObjectAbstract<any>>();

//     if (this.userId.hasValue()) result.push(this.userId);
//     if (this.name.hasValue()) result.push(this.name);
//     if (this.email.hasValue()) result.push(this.email);
//     if (this.password.hasValue()) result.push(this.password);
//     if (this.status.hasValue()) result.push(this.status);
//     const role = this.role.createArrayFromValueObjects();
//     if (role.length > 0) result.push(...role);

//     return result;
//   }

//   toPrimitives(): UserTypeGeneric {
//     this.checkValidateValueObjects();
//     return {
//       userId: this.userId.valueOf(),
//       name: this.name.valueOf(),
//       email: this.email.valueOf(),
//       password: this.password.valueOf(),
//       status: this.status.valueOf(),
//       role: this.role?.toPrimitives(),
//     } as UserTypeGeneric;
//   }
// }
