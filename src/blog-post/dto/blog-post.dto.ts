import { IsNotEmpty } from 'class-validator';

export class blogsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  date_posted: string;
}
