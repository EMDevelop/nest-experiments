// IMPORTS
import os from 'os';

// TYPES
type OutputMetric = 'bytes' | 'megabytes' | 'gigabytes';
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

// DECORATORS
/**
 * @description This is a Decorator
 * Place above a method to log the current node process memory vs the limit.
 * Ref: https://nodejs.org/api/process.html#process_process_memoryusage
 */
export function MemoryDebugger(logLevel: LogLevel, output?: OutputMetric) {
  return (
    target: any /* eslint-disable-line */,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor => {
    const originalFunction = descriptor.value;

    descriptor.value = function (...args: any[]) {
      // Before
      logOutput(logLevel, `Start: ${propertyKey}, ${snapshot(output)}`);

      //   Actual
      const result = originalFunction.apply(this, args);

      //   After
      logOutput(logLevel, `End: ${propertyKey}, ${snapshot(output)}`);

      return result;
    };

    return descriptor;
  };
}

// METHODS
/** @description fetch the current memory usage
 * Heap Total: Just the heap, where objects live.
 * RSS: The total amount of memory allocated for the process execution. This includes the heap, code segment, and stack.
 */
const getCurrentMemory = (output: OutputMetric) => {
  const memory = process.memoryUsage();

  const heapBytes = memory.heapUsed;
  const heapMB = round(memory.heapUsed / 1024 / 1024);
  const heapGB = round(heapMB / 1024);

  const rssBytes = memory.rss;
  const rssMB = round(memory.rss / 1024 / 1024);
  const rssGB = round(rssMB / 1024);

  //   show total available system memory
  const totalSystemMemory = os && os.totalmem() ? os.totalmem() : undefined;

  const totalSystemMemoryMB =
    totalSystemMemory && round(totalSystemMemory / 1024 / 1024);
  const totalSystemMemoryGB =
    totalSystemMemory && round(totalSystemMemoryMB / 1024);

  switch (output) {
    case 'bytes':
      return `Heap: ${heapBytes} bytes, RSS: ${rssBytes} bytes, System Available Memory: ${totalSystemMemory} bytes`;
    case 'megabytes':
      return `Heap: ${heapMB} MB, RSS: ${rssMB} MB, System Available Memory: ${totalSystemMemoryMB} MB`;
    case 'gigabytes':
      return `Heap: ${heapGB} GB, RSS: ${rssGB} GB, System Available Memory: ${totalSystemMemoryGB} GB`;
    default:
      return `Heap: ${heapMB} MB, RSS: ${rssMB} MB, System Available Memory: ${totalSystemMemoryMB} MB`;
  }
};

function round(value: number) {
  return Math.round(value * 100) / 100;
}
function snapshot(output: OutputMetric = 'megabytes') {
  return `Memory Snapshot: ${getCurrentMemory(output)}`;
}
function logOutput(logLevel: LogLevel, message: string) {
  switch (logLevel) {
    case 'info':
      console.info(message);
      break;
    case 'warn':
      console.warn(message);
      break;
    case 'error':
      console.error(message);
      break;
    case 'debug':
      console.debug(message);
      break;
    default:
      console.debug(message);
      break;
  }
}
