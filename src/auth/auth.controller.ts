import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from '../users/entities/user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
   @ApiOperation({
    summary: 'Sign up a new user',
    description: 'Registers a new user by creating their account with a hashed password.',
  })
  @ApiBody({
    description: 'The data required to create a new user.',
    type: UserDto,
    examples: {
      example: {
        summary: 'Example Request',
        value: {
          userName: 'john_doe',
          password: 'securepassword123',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully.',
    examples: {
      success: {
        summary: 'Successful Registration',
        value: { message: 'User registered successfully' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request. Validation errors.' })
  async signUp(@Body() userDto: UserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    await this.usersService.create({
      userName: userDto.userName,
      password: hashedPassword,
    });
    return { message: 'User registered successfully' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
   @ApiOperation({
    summary: 'Log in a user',
    description: 'Authenticates a user and generates a JWT token for access.',
  })
  @ApiBody({
    description: 'The login credentials required to authenticate the user.',
    examples: {
      example: {
        summary: 'Example Request',
        value: {
          userName: 'john_doe',
          password: 'securepassword123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully, returns a JWT token.',
    examples: {
      success: {
        summary: 'Successful Login',
        value: {
          access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid credentials.' })
  async login(@Body() userDto: UserDto) {
    const user = await this.authService.validateUser(
      userDto.userName,
      userDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
