import { Module } from '@nestjs/common';
import { PerformanceModule } from './performance/performance.module';

@Module({
  imports: [PerformanceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
