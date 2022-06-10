import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateOwnerTodoDto {
  @IsString()
  @IsNotEmpty()
  owner: string;
}
