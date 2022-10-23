import { Injectable } from '@nestjs/common';
import {
  MemoryDebugger,
  getPrimativeFromIndex,
} from './decorators/memory/memory-debugger';

type TypeSet = { num: number; array: any[]; obj: any; str: string };

@Injectable()
export class PerformanceService {
  private readonly arrayForMemoryAdjustment = [];

  memoryDecorator(
    num: number,
    array: any[],
    obj: any,
    str: string,
    params: TypeSet,
  ) {
    this.testRegularArguments(num, str, true);
  }

  @MemoryDebugger('info', 'megabytes', getPrimativeFromIndex(0))
  private testRegularArguments(first: number, second: string, third: boolean) {}

  @MemoryDebugger('info', 'megabytes', getPrimativeFromIndex(0))
  private testArrayArguments() {}
}
