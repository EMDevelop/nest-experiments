import { Controller, Get } from '@nestjs/common';
import { PerformanceService } from './performance.service';

@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Get('memory-decorator')
  memoryDecorator() {
    const params = 1
    this.performanceService.memoryDecorator(params)
  }
}
