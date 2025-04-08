import { PickType } from "@nestjs/mapped-types";
import { AuthDto } from "./auth.dto";

export class SignInDto extends PickType(AuthDto, ['email', 'password']) { }