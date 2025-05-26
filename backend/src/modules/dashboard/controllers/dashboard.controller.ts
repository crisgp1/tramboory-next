import { Controller, Get } from '@nestjs/common';
import { DashboardService } from '@/dashboard/services/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  getStatus() {
    return { status: 'Dashboard module running' };
  }
}