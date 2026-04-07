import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(8)
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    passwordHash: string;

    @IsString()
    bio: string;

    @IsString()
    roleName: string;
}