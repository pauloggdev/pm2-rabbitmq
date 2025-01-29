import cron from "node-cron"
import CronJobService from "../../domain/repository/cronJobService";

export default class NodeCron {
    constructor(
        readonly service: CronJobService,
        readonly minute: string | number = '*',
        readonly hour: string | number = '*',
        readonly dayMonth: string | number= '*',
        readonly month: string | number= '*',
        readonly dayWeek: string | number= '*',
        readonly timezone: string | number= "Africa/Luanda") {
    }
    scheduleJob(params:any = null): void {
        const cronTime = `${this.minute} ${this.hour} ${this.dayMonth} ${this.month} ${this.dayWeek}`;
        //cron.schedule('* * * * *')
        cron.schedule('*/1 * * * *', () => {
            try{
                this.service.execute(params);
                console.log('Cron executed successfully')
            }catch(error){
                console.error('Error croJob:', error);
            }
        }, {
            timezone: `${this.timezone}`
        });

    }
}
/*
*  *  *  *  *
|  |  |  |  |
|  |  |  |  +---- Dia da semana (0 - 7) (Domingo=0 ou 7)
|  |  |  +------- Mês (1 - 12)
|  |  +---------- Dia do mês (1 - 31)
|  +------------- Hora (0 - 23)
+---------------- Minuto (0 - 59)
*/
