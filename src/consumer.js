const cron = require('node-cron');

const EmailService = require('./EmailService')
const emailService = new EmailService('geral@kima-solucoes.com', '!2024Kima');

async function startConsumer() {
    console.log('Aguardando 1min para iniciar o consumo...');
    cron.schedule('*/1 * * * *', () => {
        emailService.sendEmail(
            'pauloggjoao@gmail.com',
            'Assunto do E-mail',
            'Corpo do e-mail em texto',
            '<h1>Corpo do e-mail em HTML</h1>'
        )
        console.log('Mensagem enviada...');

        
    }, {
        timezone: "Africa/Luanda"  // Defina o fuso horário, se necessário
    });
}
startConsumer(); 
