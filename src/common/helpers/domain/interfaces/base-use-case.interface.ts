export interface BaseUseCaseInterface<Fields, Entity> {
  run(fields: Fields, rqid: string): Promise<Entity>;
}
