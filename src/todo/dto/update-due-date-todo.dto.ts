import { IsDate, IsNotEmpty } from 'class-validator';

export class UpdateDueDateTodoDto {
  @IsNotEmpty()
  @IsDate()
  dueAt: Date;
}
