const Chat = require('../app/models/chat')
const { changeStatus, nextConsultas } = require('../resources/axios')
const { MESSAGES } = require('./defaultMessages')
const { regex } = require('./functions')

const responseMessage = async (message, consulta = {}) => {
  const messageLower = message.body.toLowerCase()
  const responseMessages = {
    ['0']: MESSAGES.desenvolvimento,
    ['1']: MESSAGES.search,
    ['2']: MESSAGES.endereco,
    ['3']: MESSAGES.instagram,
    ['4']: MESSAGES.whatsapp,
    ['5']: MESSAGES.funcionamento,
    ['6']: MESSAGES.convenios,
    ['7']: MESSAGES.menu,
    ['8']: MESSAGES.voltar,
    ['menu']: MESSAGES.menu,
    ['0,0']: MESSAGES.search,
    ['0,1']: MESSAGES.name,
    opcao: MESSAGES.opcao,

    confirmar: 'Obrigado por confirmar a consulta! Tenha um ótimo dia e até mais :)\n\n'+
    'Digite *"Menu"* para iniciar uma conversa.',

    desmarcar: 'Consulta desmarcada! logo entraremos em contato para reagendar a sua consulta :)\n\n'+
    'Digite *"Menu"* para iniciar uma conversa.',

    default: 'Desculpe, não entendi :/, pode digitar a opção novamente por favor\n\n'+
    'A qualquer momento, digite *"Menu"* para reiniciar a conversa.',
  }

  if(message.fromMe){
    await Chat.create({ idChat: message.to, response: ['confirmacao'], consulta })
  }else{
    
    if(message.body === '7' || message.body === 'menu'){
      if(await Chat.findOne({idChat: message.id.remote})){
        const {_id } = await Chat.findOne({idChat: message.id.remote})
        Chat.findByIdAndDelete({ _id }, (err) => err && console.log('err',err))
      }
      const res = responseMessages.menu
      return res
    }else{
      if(await Chat.findOne( { idChat : message.id.remote })){
        const {_id, response, consulta } = await Chat.findOne({idChat: message.id.remote})
        if(response[0] === 'confirmacao'){
          if(consulta){
            if(regex(message.body) === 'confirmada'){
              const res = responseMessages.confirmar
              changeStatus(consulta,1)
              if(await Chat.findOne({idChat: message.id.remote})){
                const {_id } = await Chat.findOne({idChat: message.id.remote})
                Chat.findByIdAndDelete({ _id }, (err) => err && console.log('err',err))
              }
              return res
            }else if(regex(message.body) === 'desmarcada'){
              const res = responseMessages.desmarcar
              changeStatus(consulta,6)
              if(await Chat.findOne({idChat: message.id.remote})){
                const {_id } = await Chat.findOne({idChat: message.id.remote})
                Chat.findByIdAndDelete({ _id }, (err) => err && console.log('err',err))
              }
              return res
            }else{
              const res = responseMessages.default
              return res
            }
          }else{
            console.log('erro ao mudar o status da consulta')
          }
        }
        else if(response[0] === '1'){
          if(response[1]){
            if(message.body === '2'){
              const res = 'digite novamente'
              await Chat.findByIdAndUpdate({ _id }, { 
                response: ['1'] }, (err) => {
                if(err){
                  console.log('err',err)
                }
              })
              return res
            }else if(message.body === '1'){
               return new String(await nextConsultas(response[1])).replace(/,/g,'')
            }else{
              const res = responseMessages.default
              return res
            }
          }else{
            const res = responseMessages.opcao
            response.push(message.body.replace(/[\.\-\/]/g,''))
            Chat.findByIdAndUpdate({ _id }, { 
              response }, (err) => {
              if(err){
                console.log('err',err)
              }
            })
            return res
          }
        }
        else{
          response.push(message.body)
          const res = responseMessages[response.toString()] || responseMessages.default 
          if(res !== responseMessages.default){
            Chat.findByIdAndUpdate({ _id }, { 
              response }, (err) => {
              if(err){
                console.log('err',err)
              }
            })
          }
          return res
        }
      }else{
        const res = responseMessages[messageLower] || responseMessages.menu
        if(responseMessages[messageLower])
           await Chat.create({ idChat: message.id.remote, response: [message.body] })
        return res
      }
    }
  }
}

module.exports = { responseMessage }