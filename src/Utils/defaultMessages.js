const axios = require("axios")

const MESSAGES = {
    // agendar: 'Agendar consulta',
    agendar: 'Você já é paciente nosso? :\n' +
    '\n' +
    '1️⃣ - Sim\n' +
    '2️⃣ - Não\n',

    proxima: 'Próxima consulta',

    opcao: 'Confirma a opção? :\n' +
    '\n' +
    '1️⃣ - Sim\n' +
    '2️⃣ - Não\n',

    desenvolvimento:'Função em desenvolvimento 🏗️\n'+
    '\n' +
    'Logo irá estar disponível 🙃\n'+
    '\n'+
    'A qualquer momento, digite *"Menu"* para reiniciar a conversa.\n',

    saudacao:'Olá! Bem-vindo ao atendimento online da IGO! Como posso te ajudar?',


    instagram: 'Siga nossas redes para ver nosso casos e ter dicas para se cuidar!\n'+
    'https://www.instagram.com/institutogalindoodontologia/\n'+
    '\n' +
    'https://www.facebook.com/igodonto\n'+
    '\n'+
    'A qualquer momento, digite *"Menu"* para reiniciar a conversa.\n',


    endereco: 'Segue o nosso endereço! \n https://goo.gl/maps/t1q1aybpMDPpbWjQ6\n'+
    '\n' +
    'A qualquer momento, digite *"Menu"* para reiniciar a conversa.\n',


    horario: 'Nosso horário de funcionamento é de segunda a sexta das 8h às 19h!\n'+
    '\n' +
    'A qualquer momento, digite *"Menu"* para reiniciar a conversa.\n',

    whatsapp:`Segue o nosso número para falar com um de nossos atendentes:\n 
    https://api.whatsapp.com/send?phone=5511940137751&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida \n
    A qualquer momento, digite *"Menu"* para reiniciar a conversa.`,

    menu: 'Digite uma das opções abaixo :\n' +
    '\n' +
    '0️⃣ - Agendamento\n' +
    '1️⃣ - Próximas consultas\n' +
    '2️⃣ - Endereço\n' +
    '3️⃣ - Redes Socias\n' +
    '4️⃣ - Principais dúvidas\n' +
    '5️⃣ - Funcionamento \n' +
    '6️⃣ - Convênios \n' +
    '\n' +
    'A qualquer momento, digite *"Menu"* para reiniciar a conversa.\n',

    fran:(nome, data, profissional) => `Olá ${nome} ! Espero que esteja bem!\n`+
    '\n'+
    `Aqui é o Lucas da IGO, ${data} você tem uma consulta com a Dra Ingrid, porém a dra teve um imprevisto e não vai poder atender amanhã!\n`+
    `Poderiamos entrar em contato via telefone para reagendarmos essa consulta?`,


    
    confirmar: (nome, data, profissional) => `Olá ${nome} ! Espero que esteja bem!!!\n` +
    '\n' +
    `É o Lucas da IGO, estou avisando que a sua consulta será *${data} com Dr(a) ${profissional} !!*\n` +
    '\n' +
    'Podemos confirmar?\n'+
    '1️⃣ - Sim\n'+ 
    '2️⃣ - Não\n'+
    '\n' +
    'Qualquer dúvida pode entrar em contato conosco pelo número (11)34594383\n'+
    '\n'+
    'Lucas\n' +
    'Instituto Galindo Odontologia',


    funcionamento: 'Nosso horário de funcionamento é de segunda a sexta feira das 8h às 19h\n'+
    '\n' +
    'A qualquer momento, digite *"Menu"* para reiniciar a conversa.\n',


    av: 'Você já é nosso paciente?',


    search: 'Digite só os números do seu CPF por favor\n'+
    '\n' +
    'A qualquer momento, digite *"Menu"* para reiniciar a conversa.\n',


    cadastrar: async (nome, cpf, celular, plano) => {
        const json = { "nome": String(nome), "cpf": typeof(cpf) !== null ? String(cpf) : null , "celular": String(celular), "plano": {"id": Number(plano)}}

        axios.post('https://api.simplesdental.com/pacientes', json , {headers: {'X-AUTH-TOKEN':'ZGqeHEsCUwcUmmA4FvxM8oUQ2B3I8fN0h0zPvf2KPR46pbRAha3z2UIw3PTMI8cj'}}).then(res => console.log(res.data)).catch(err => console.log('err',err))
    },

    name: 'Qual é o seu nome completo?',


    convenios: 'Os convênios que atendemos:\n'+
                '\n'+
                'Porto seguro \n' +
                'Sulamérica \n' +
                'Odontoprev \n' +
                'Bradesco \n' +
                'Privian \n' +
                'Interodonto \n' +
                'Prevident \n' +
                'Odonto empresas \n' +
                'Odonto Santander \n' +
                'Metlife\n'+
                '\n' +
                'A qualquer momento, digite *"Menu"* para reiniciar a conversa.\n',


    voltar: 'Digite *"Voltar"* para voltar ao menu',


    covid: (name,data, profissional) => `Boa tarde ${name} ! aqui é o lucas, tudo bem? estou entrando em contato para informar que a sua consulta de ${data} com Dr(a) ${profissional} está sendo desmarcada :/\n
    Estamos tomando medidas levando em consideraçao o aumento exponencial de casos visando a segurança de todos! podemos reagendar a sua consulta?`,

    desmarcar: (name, data) => `Bom dia ${name} ! Aqui é o Lucas, tudo bem?\nEstou entrando em contato para desmarcamos a sua consulta de ${data} com a Dra Tatiana, ela testou positivo para covid e vai ficar um tempo fora :/\nPodemos reagendar a sua consulta?`

}

module.exports = { MESSAGES }