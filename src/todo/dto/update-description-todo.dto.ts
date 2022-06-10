import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDescriptionTodoDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}
