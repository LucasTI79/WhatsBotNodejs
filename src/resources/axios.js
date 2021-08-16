require('dotenv').config()
const axios = require('axios')
const Chat = require('../app/models/chat')

const { convertISODate, plano, dr } = require('../Utils/functions')

const options = {
  params: {
    startDh:'2021-07-30T03:00:00.000Z',
    endDh:  '2021-07-31T03:00:00.000Z',
    minimal:false,
    pageNumber:1
  }
}

const consultasSemana = async () => {
  await Chat.deleteMany()
  const response = await axios.get('https://api.simplesdental.com/consultas', options)
  return response.data
}

const getProfessionals = async (consulta) => {
  const response = await axios.get(`https://api.simplesdental.com/profissionais`, options)
  const data = response.data.content.map(professional => ({ id: professional.id ,dr: professional.nome.split(' ')[0]}))
  return data
}

const getPlans = async (consulta) => {
  const response = await axios.get(`https://api.simplesdental.com/plans`, options)
  const data = response.data.content.map(professional => ({ id: professional.id ,dr: professional.nome.split(' ')[0]}))
  return data
}

const detalhesConsulta = async (consulta) => {
  const response = await axios.get(`https://api.simplesdental.com/consultas/${consulta.id}`, options)
  return response.data
}

const FiltroConsultaPorfissional = (consulta, idProfissional) => {
  return newConsultas = Array(consulta).filter(filter => consulta.profissional.id === idProfissional)
}

const orto = async () => {
  axios.get('https://api.simplesdental.com/consultas', options)
  .then(r => {
    let consultas = []
    r.data.forEach(consulta => {
      if(consulta.profissional.id === 90712 || consulta.profissional.id === 194446 || consulta.profissional.id === 91892)
        // consultas.push({'Profissional':dr(consulta.profissional.id), 'Paciente': consulta.paciente.nome })
        console.log(`Profissional:${dr(consulta.profissional.id)}, Paciente:${consulta.paciente.nome&&consulta.paciente.nome}, Data: ${consulta.dataFormatada}, Convênio: ${plano(consulta.paciente.plano.id)}`)
    })
    console.log('consultas',consultas)
  }).catch(err => console.log('err',err))
}

const nextConsultas = async cpf => {
  options.params.q = cpf
  let next = ['Suas próximas consultas:\n\n']
  await axios.get('https://api.simplesdental.com/pacientes', options)
    .then(async r => {
    await axios.get(`https://api.simplesdental.com/pacientes/${r.data.content[0].id}/consultas`, options)
      .then(con => {
        
        const res = con.data.content
        .filter(consulta => (
            consulta.data > new Date().toISOString() && 
            consulta.status === 0 || 
            consulta.status === 1 || 
            consulta.status === 4 
        ))
       
        if(String(res)){
          res.forEach(cons => next.push(`${convertISODate(cons.data)} ${cons.profissional.nome}\n`))
        }else{
          next.push('Não foram encontradas consultas para esse paciente :/\n')
        }
        
    })
    delete options.params.q 
  })
  next.push('\n A qualquer momento, digite *"Menu"* para reiniciar a conversa.\n')
  return next
}

const changeStatus = (consulta,status) => {
  const statusConsulta = {
    0: 'Agendada',
    1: 'Confirmada',
    2: 'Em Atendimento',
    3: 'Finalizada',
    4: 'Paciente aguardando',
    5: 'Cancelada pelo profissional',
    6: 'Cancelada pelo paciente',
    7: 'Falta'
  }
  axios.put(`https://api.simplesdental.com/consultas/${consulta.id}`, { status }, options)
  console.log(statusConsulta[status])
}


module.exports = { consultasSemana, detalhesConsulta , FiltroConsultaPorfissional, changeStatus, nextConsultas, options }
// ;
// (async ()=> {
//   console.log('next',nextConsultas('23285763892'))
// })()

;
(async() => {
  axios.post('https://api.simplesdental.com/loginmultiplo', {
    username: 'contato@igodonto.com.br',
    password: '280612',
    token: null
  })
  .then(async res => {
    options.headers = {'X-AUTH-TOKEN': res.data.profissionais[0].user.token} 
    // console.log('profissionais', await getProfessionals())
    // console.log(options.headers)
    // console.log(await orto())
    consultasSemana().then(response => {
      response.forEach(consulta => {
        detalhesConsulta(consulta).then(consultaExpecifica =>  {
          if(consultaExpecifica.paciente.celular){
            if([5,6,7].includes(consultaExpecifica.status)){
              console.log(
                consultaExpecifica.paciente.nome.split(' ')[0],
                convertISODate(consultaExpecifica.data,'confirmacao')  ,
                
              )
            }
          }       
        })
      })
    })
  
  })
})()