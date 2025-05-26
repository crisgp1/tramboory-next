import { 
  Controller, 
  Post, 
  Get, 
  Put, 
  Body, 
  Param, 
  HttpStatus, 
  HttpCode,
  UseGuards,
  Request
} from '@nestjs/common';
import { AuthService } from '@/auth/services/auth.service';
import { CreateAuthDto } from '@/auth/dto/create-auth.dto';

// DTO para login
export class LoginDto {
  email: string;
  password: string;
}

// DTO para actualizar perfil
export class UpdateProfileDto {
  nombre?: string;
  telefono?: string;
  direccion?: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createAuthDto: CreateAuthDto) {
    try {
      const result = await this.authService.signUp(createAuthDto);
      return {
        success: true,
        message: 'Usuario registrado exitosamente',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.signIn(loginDto.email, loginDto.password);
      return {
        success: true,
        message: 'Inicio de sesión exitoso',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    try {
      const result = await this.authService.signOut();
      return {
        success: true,
        message: result.message,
        data: null,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('me')
  async getCurrentUser() {
    try {
      const result = await this.authService.getCurrentUser();
      return {
        success: true,
        message: 'Usuario obtenido exitosamente',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('profile/:userId')
  async getUserProfile(@Param('userId') userId: string) {
    try {
      const profile = await this.authService.getUserProfile(userId);
      return {
        success: true,
        message: 'Perfil obtenido exitosamente',
        data: profile,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put('profile/:userId')
  async updateProfile(
    @Param('userId') userId: string,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    try {
      const profile = await this.authService.updateProfile(userId, updateProfileDto);
      return {
        success: true,
        message: 'Perfil actualizado exitosamente',
        data: profile,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Post('verify-permission')
  async verifyPermission(@Body() body: { permiso: string; nivel?: string }) {
    try {
      const hasPermission = await this.authService.verificarPermiso(
        body.permiso, 
        body.nivel as any || 'lectura'
      );
      return {
        success: true,
        message: 'Permiso verificado',
        data: { hasPermission },
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }
}