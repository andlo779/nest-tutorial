import * as crypto from 'crypto';

export class Todo {
  private _id: string;
  private _title: string;
  private _description: string;
  private _owner: string;
  private _createdAt: Date;
  private _dueAt: Date | undefined;

  constructor(title: string, description: string, owner: string) {
    this._id = crypto.randomUUID();
    this._title = title;
    this._description = description;
    this._owner = owner;
    this._createdAt = new Date();
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get owner(): string {
    return this._owner;
  }

  set owner(value: string) {
    this._owner = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get dueAt(): Date | undefined {
    return this._dueAt;
  }

  set dueAt(value: Date) {
    this._dueAt = value;
  }
}
