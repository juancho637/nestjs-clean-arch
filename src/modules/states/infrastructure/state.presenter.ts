import { StateType } from '../domain';

export class StatePresenter {
  id: number;
  name: string;
  status: string;

  constructor(state: StateType) {
    this.id = state.id;
    this.name = state.name;
    this.status = state.status;
  }
}
