import { Controller, Get } from '@nestjs/common';
import { PerformanceService } from './performance.service';

@Controller('performance')
export class PerformanceController {
  constructor(private readonly performanceService: PerformanceService) {}

  @Get('memory-decorator')
  memoryDecorator() {
    const number = 1;
    const array = ['first', 'second', 'third', 'fourth', 'fifth'];
    const obj = { uno: 1, dos: 2, tres: 3, cuatro: 4, cinco: 5 };
    const str = 'Hello World';
    const paramsAsOne = {
      num: number,
      array: array,
      obj,
      str,
    };
    this.performanceService.memoryDecorator(
      number,
      array,
      obj,
      str,
      paramsAsOne,
    );
  }
}
