export class StatusDto {
  status: string;
  numberOfTodos: number;

  constructor(status: string, numberOfTodos: number) {
    this.status = status;
    this.numberOfTodos = numberOfTodos;
  }
}
