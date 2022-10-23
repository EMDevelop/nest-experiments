import { Injectable } from '@nestjs/common';
import { MemoryDebugger } from './decorators/memory/memory-debugger';

@Injectable()
export class PerformanceService {
  private readonly arrayForMemoryAdjustment = [];

  @MemoryDebugger('info', 'megabytes')
  memoryDecorator(params: any) {
    console.log('The contents of the function');
  }
}
