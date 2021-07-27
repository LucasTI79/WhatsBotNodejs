require('dotenv').config()
const fs = require('fs')
const qrcode = require('qrcode-terminal');
const client = require('./modules/client.config')
const path = require('path')

const SESSION_FILE_PATH = path.resolve(__dirname,'..','session.json')

let sessionCfg;

const { convertISODate, capitalizeFirstLetter, contains, timestampIsToday, monthShort } = require('./Utils/functions')
const { responseMessage } = require('./Utils/responseMessages')
const { MESSAGES } = require('./Utils/defaultMessages');
const { consultasSemana, detalhesConsulta, changeStatus } = require('./resources/axios')

client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
  console.log('ready')
  
  consultasSemana().then(response => {
    response.forEach(consulta => {
      detalhesConsulta(consulta).then(consultaExpecifica =>  {
        if(consultaExpecifica.paciente.celular){
          if(consultaExpecifica.status === 0 || consultaExpecifica.status === 2){
              // console.log(
              //   consultaExpecifica.paciente.nome.split(' ')[0],
              //   convertISODate(consultaExpecifica.data,'default')  
              // )
              client.sendMessage(
                `55${consultaExpecifica.paciente.celular}@c.us`,
                `${
                  MESSAGES.confirmar(
                    capitalizeFirstLetter(consultaExpecifica.paciente.nome.split(' ')[0]),
                    convertISODate(consultaExpecifica.data,'confirmacao'),
                    capitalizeFirstLetter(consultaExpecifica.profissional.nome.split(' ')[0])
                  )}`
              )
              .then(r =>  responseMessage(r, consultaExpecifica))
              changeStatus(consultaExpecifica, 4)
              
            }
         // }
        }       
      })
    })
  })

})

client.on('message', message => {
 if(!message.isStatus)
  message.body = message.body.toLocaleLowerCase()
  if(message.from === '5511984781330@c.us' || message.from === '5511979675330@c.us' || message.from === '5511981451920@c.us' || message.from === '5511979675330@c.us'){
    message.getChat().then(async res => {
      const messages = await res.fetchMessages({limit: 12 });
      const messagesFiltered = messages.filter((element, i, self) => i === self.findIndex((el) => (el.body === element.body))); //filtrar para remover mensagens repetidas
      if(!timestampIsToday(messagesFiltered[messagesFiltered.length - 2].timestamp)){
        client.sendMessage(message.from, MESSAGES.saudacao)
        client.sendMessage(message.from, MESSAGES.menu)
      }else{
        client.sendMessage(
          message.from, 
          responseMessage(message)
            .then()
            .catch(err => console.log('error in responseMessage from index.js',err))
        )
      }
    })
  }
})
        


client.on('message_create', async (msg) => {
  if (msg.fromMe) {
  }
});

client.on('authenticated', session => {
  sessionCfg=session;
  fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(sessionCfg), function (err) {
      if (err) {
          console.error('err',err);
      }
  });
});

client.on('auth_failure', msg => {
  // Fired if session restore was unsuccessfull
  console.error('AUTHENTICATION FAILURE', msg);
});

client.on('disconnected', () => console.log('desconectou'))

client.on('change_battery', (batteryInfo) => {
  // Battery percentage for attached device has changed
  const { battery, plugged } = batteryInfo;
  console.log(`Battery: ${battery}% - Charging? ${plugged}`);
});

client.on('change_state', state => {
  console.log('CHANGE STATE', state );
  if(state === 'PAIRING'){
    fs.writeFileSync(SESSION_FILE_PATH, {} , function (err) {
      if (err) {
          console.error('err',err);
      }
    });
  }
});

client.initialize();