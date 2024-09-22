export default interface CronJobService{
    execute(...args: any[]): void;
}