import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query,
  HttpStatus, 
  HttpCode 
} from '@nestjs/common';
import { ReservasService } from '@/reservas/services/reservas.service';
import { CreateReservasDto, ReservaFiltersDto, EstadoReserva } from '@/reservas/dto/create-reservas.dto';

@Controller('reservas')
export class ReservasController {
  constructor(private readonly reservasService: ReservasService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createReservasDto: CreateReservasDto) {
    try {
      const reserva = await this.reservasService.create(createReservasDto);
      return {
        success: true,
        message: 'Reserva creada exitosamente',
        data: reserva,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get()
  async findAll(@Query() filters: ReservaFiltersDto) {
    try {
      const reservas = await this.reservasService.findAll(filters);
      return {
        success: true,
        message: 'Reservas obtenidas exitosamente',
        data: reservas,
        count: reservas.length,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('usuario/:userId')
  async getUserReservas(@Param('userId') userId: string) {
    try {
      const reservas = await this.reservasService.getUserReservas(userId);
      return {
        success: true,
        message: 'Reservas del usuario obtenidas exitosamente',
        data: reservas,
        count: reservas.length,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get('rango-fechas')
  async getReservasByDateRange(
    @Query('fechaInicio') fechaInicio: string,
    @Query('fechaFin') fechaFin: string
  ) {
    try {
      const reservas = await this.reservasService.getReservasByDateRange(fechaInicio, fechaFin);
      return {
        success: true,
        message: 'Reservas por rango de fechas obtenidas exitosamente',
        data: reservas,
        count: reservas.length,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const reserva = await this.reservasService.findOne(id);
      return {
        success: true,
        message: 'Reserva obtenida exitosamente',
        data: reserva,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateReservasDto: CreateReservasDto) {
    try {
      const reserva = await this.reservasService.update(id, updateReservasDto);
      return {
        success: true,
        message: 'Reserva actualizada exitosamente',
        data: reserva,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Put(':id/estado')
  async changeStatus(@Param('id') id: string, @Body() body: { estado: EstadoReserva }) {
    try {
      const reserva = await this.reservasService.changeStatus(id, body.estado);
      return {
        success: true,
        message: 'Estado de reserva actualizado exitosamente',
        data: reserva,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.reservasService.remove(id);
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
}