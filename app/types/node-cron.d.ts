declare module 'node-cron' {
    type CronCommand = () => void;
    type CronSchedule = string;
    type CronOptions = {
      scheduled?: boolean;
      timezone?: string;
    };
  
    interface ScheduledTask {
      start: () => void;
      stop: () => void;
      destroy: () => void;
    }
  
    export function schedule(
      cronSchedule: CronSchedule,
      cronCommand: CronCommand,
      options?: CronOptions
    ): ScheduledTask;
  }
  