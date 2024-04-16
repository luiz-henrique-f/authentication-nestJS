import { IsNotEmpty, Matches } from 'class-validator';
import { MessageHelper } from 'src/helpers/messages.helper';
import { RegExHelper } from 'src/helpers/regex.helper';

export class CreateUserDTO {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Matches(RegExHelper.password, {
    message: MessageHelper.PASSWORD_VALID,
  })
  password: string;
}
