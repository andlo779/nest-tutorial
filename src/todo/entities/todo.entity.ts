import * as crypto from 'crypto';

export class Todo {
  uuid: string;
  title: string;
  description: string;
  owner: string;
  readonly createdAt: Date;
  dueAt: Date;

  constructor(title: string, description: string, owner: string) {
    this.uuid = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.owner = owner;
    this.createdAt = new Date();
  }
}
