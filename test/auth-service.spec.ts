import { Test } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByUserName: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return null if user is not found', async () => {
      jest.spyOn(usersService, 'findByUserName').mockResolvedValue(null);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const result = await authService.validateUser('username', 'password');
      expect(result).toBeNull();
    });
    it('should return null if password is incorrect', async () => {
      jest
        .spyOn(usersService, 'findByUserName')
        .mockResolvedValue({ id: 1 } as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
      const result = await authService.validateUser('username', 'password');
      expect(result).toBeNull();
    });
    it('should return user if password is correct', async () => {
      jest
        .spyOn(usersService, 'findByUserName')
        .mockResolvedValue({ id: 1 } as any);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const result = await authService.validateUser('username', 'password');
      expect(result).toEqual({ id: 1 });
    });
  });
  describe('login', () => {
    it('should return access token', async () => {
      const payload = {
        dataValues: {
          userName: 'username',
          id: 1,
          role: 'user',
        },
      };
      jest.spyOn(jwtService, 'sign').mockReturnValue('access_token');
      const result = await authService.login(payload);
      expect(jwtService.sign).toHaveBeenCalledWith({
        userName: 'username',
        sub: 1,
        role: 'user',
      });
      expect(result).toEqual({ access_token: 'access_token' });
    });
  });
});
