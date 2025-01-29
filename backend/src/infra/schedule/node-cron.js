"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
class NodeCron {
    constructor(service, minute = '*', hour = '*', dayMonth = '*', month = '*', dayWeek = '*', timezone = "Africa/Luanda") {
        this.service = service;
        this.minute = minute;
        this.hour = hour;
        this.dayMonth = dayMonth;
        this.month = month;
        this.dayWeek = dayWeek;
        this.timezone = timezone;
    }
    scheduleJob(params = null) {
        const cronTime = `${this.minute} ${this.hour} ${this.dayMonth} ${this.month} ${this.dayWeek}`;
        //cron.schedule('* * * * *')
        node_cron_1.default.schedule('*/1 * * * *', () => {
            try {
                this.service.execute(params);
                console.log('Cron executed successfully');
            }
            catch (error) {
                console.error('Error croJob:', error);
            }
        }, {
            timezone: `${this.timezone}`
        });
    }
}
exports.default = NodeCron;
/*
*  *  *  *  *
|  |  |  |  |
|  |  |  |  +---- Dia da semana (0 - 7) (Domingo=0 ou 7)
|  |  |  +------- Mês (1 - 12)
|  |  +---------- Dia do mês (1 - 31)
|  +------------- Hora (0 - 23)
+---------------- Minuto (0 - 59)
*/
