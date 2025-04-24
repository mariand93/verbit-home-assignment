/**
 * Simple logger for test execution
 */
export class Logger {
    private readonly context: string;
  
    constructor(context: string) {
      this.context = context;
    }
  
    /**
     * Log info message
     */
    info(message: string, data?: any): void {
      this.log('INFO', message, data);
    }
  
    /**
     * Log error message
     */
    error(message: string, data?: any): void {
      this.log('ERROR', message, data);
    }
  
    /**
     * Log warning message
     */
    warn(message: string, data?: any): void {
      this.log('WARN', message, data);
    }
  
    /**
     * Log debug message
     */
    debug(message: string, data?: any): void {
      if (process.env.DEBUG) {
        this.log('DEBUG', message, data);
      }
    }
  
    /**
     * Internal log method
     */
    private log(level: string, message: string, data?: any): void {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] [${level}] [${this.context}] ${message}`;
      
      if (data) {
        console.log(logMessage, JSON.stringify(data, null, 2));
      } else {
        console.log(logMessage);
      }
    }
  }