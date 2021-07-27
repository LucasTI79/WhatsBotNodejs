const DATA_CONFIG = {
    weekday:'long',
    year:'numeric',
    month:'long',
    day:'numeric',
}

const regexConfirmar = new RegExp((/confirmar|1|sim|confirmada|s$/gi))
const regexDesmarcar = new RegExp(/desmarcar|2|nao|não|remarcar|desmarcada|remarcada/gi)
const regex = (string) => {
  string = string.toLowerCase()
  if(regexConfirmar.exec(string))
    return 'confirmada'
  if(regexDesmarcar.exec(string))
    return 'desmarcada'
  return 'não entendi'
}
  
function capitalizeFirstLetter(string) { //String
    string = string.toLowerCase() 
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function contains(target, pattern){ //string , array de strings
    var value = 0;
    pattern.forEach(function(word){
      value = value + target.includes(word);
    });
    return (value === 1)
}

function timestampIsToday(timestamp) {
    const data = new Date().toLocaleDateString('en-US')
    const dataInicio = (new Date(data).getTime() / 1000)
    const dataFim = dataInicio + 86399
    if(dataInicio < timestamp &&  timestamp < dataFim){
        return true
    }else{
        return false
    }
  }

function convertISODate(str,format = 'default'){
    if(format === 'ISO'){//input 2021-03-22 08:00 
        return new Date(str).toISOString() //return yyyy-mm-ddThh:mm:ss.SSSZ
    }else if(format === 'default'){//input 2021-03-21T11:00:00.000Z
        return `${new Date(str).toLocaleDateString('pt-BR')} ${new Date(str).toLocaleTimeString('pt-br')}` //return hh:mm:ss
    }else if(format === 'confirmacao'){//input 2021-03-21T11:00:00.000Z
        //const date = new Date(str).toLocaleDateString('pt-BR',{ weekday:'long', day:'numeric',month:'numeric',year:''}).split('-')//windows
        //console.log(date)
        return new Date(str).toLocaleDateString('pt-BR',{ weekday:'long', day:'numeric',month:'long', hour:'numeric',minute:'numeric'})// (
            //String(`${weekdayLong(date[0].split(',')[1].trim())}, dia ${date[0].split(' ')[2].slice(0,2)} de ${monthLong(date[0].split(' ')[1])} às ${new Date(str).toLocaleTimeString('pt-br',{hour:'numeric',minute:'numeric'})}`))
    }else{
        return { error: 'Invalid format'}
    }
}

function convertCTOISO(date){//Weekday, dia dd de mm às hh:mm
    const arrayDate = date.replace('às','').replace('dia','').replace('de','').split(',')[1].split(' ').filter(el => el != false)
    return convertISODate(new Date(`2021-${monthShort(arrayDate[1])}-${arrayDate[0]} ${arrayDate[2]}`),'ISO')//yyyy-mm-ddThh:mm:ss.SSSZ
}


function weekdayLong(weekday){
    if(weekday === 'Mon' || weekday === 'Monday'){
        return 'Segunda-feira'
    }else
    if(weekday === 'Tue' || weekday === 'Tuesday'){
        return 'Terça-feira'
    }else
    if(weekday === 'Wed' || weekday === 'Wednesday'){
        return 'Quarta-feira'
    }else
    if(weekday === 'Thu' || weekday === 'Thursday'){
        return 'Quinta-feira'
    }else
    if(weekday === 'Fri' || weekday === 'Friday'){
        return 'Sexta-feira'
    }else
    if(weekday === 'Sat' || weekday === 'Saturday'){
        return 'Sábado'
    }else
    if(weekday === 'Sun' || weekday === 'Sunday'){
        return 'Domingo'
    }else{
        return 'Weekday format invalid'
    }
}

function monthLong(month){
    if(month === '01' || month === '1' || month === 'January' || month === 'Jan'){
        return 'Janeiro'
    }
    else if(month === '02' || month === '2' || month === 'February' || month === 'Feb'){
        return 'Fevereiro'
    }
    else if(month === '03' || month === '3' || month === 'March' || month === 'Mar'){
        return 'Março'
    }
    else if(month === '04' || month === '4' || month === 'April' || month === 'Apr'){
        return 'Abril'
    }
    else if(month === '05' || month === '5' || month === 'May' || month === 'May'){
        return 'Maio'
    }
    else if(month === '06' || month === '6' || month === 'June' || month === 'Jun'){
        return 'Junho'
    }
    else if(month === '07' || month === '7' || month === 'July' || month === 'Jul'){
        return 'Julho'
    }
    else if(month === '08' || month === '8' || month === 'August' || month === 'Aug'){
        return 'Agosto'
    }
    else if(month === '09' || month === '9' || month === 'September' || month === 'Sep'){
        return 'Setembro'
    }
    else if(month === '10' || month === '10' || month === 'October' || month === 'Oct'){
        return 'Outubro'
    }
    else if(month === '11' || month === '11' || month === 'November' || month === 'Nov'){
        return 'Novembro'
    }
    else if(month === '12' || month === '12' || month === 'December' || month === 'Dec'){
        return 'Dezembro'
    }else{
        return 'Month format invalid'
    }
}

function monthShort(month){
    if(month === 'Janeiro'){
        return '01'
    }else if(month === 'Fevereiro'){
        return '02'
    }else if(month === 'Março'){
        return '03'
    }else if(month === 'Abril'){
        return '04'
    }else if(month === 'Maio'){
        return '05'
    }else if(month === 'Junho'){
        return '06'
    }else if(month === 'Julho'){
        return '07'
    }else if(month === 'Agosto'){
        return '08'
    }else if(month === 'Setembro'){
        return '09'
    }else if(month === 'Outubro'){
        return '10'
    }else if(month === 'Novembro'){
        return '11'
    }else if(month === 'Dezembro'){
        return '12'
    }else{
        return 'Month format invalid'
    }
}

function plano(planoId){
    const planos = {
        21573:'Particular', 
        35583:'Amil', 
        90009:'Bradesco', 
        91240:'Inpao', 
        35586:'Interodonto', 
        35588:'Metlife', 
        35589:'Odonto empresas', 
        90008:'Odontoprev', 
        35585:'Porto', 
        40733:'Prevident', 
        64645:'Redeunna', 
        35587:'Sulamerica', 
    }
    return planos[planoId]
}

function dr(drId){
    const drs = {
        151749:'Amanda',
        90715:'Ana',
        172605:'Bruna',
        204371:'Camila',
        153959:'Carolina',
        91892:'Danielle',
        185332:'Edilene',
        149446:'Francine',
        247420:'Gabriela',
        244455:'Ingrid',
        194446:'Karina',
        165636:'Lucas',
        184488:'Ludimila',
        260159:'Maykon',
        172635:'Monique',
        143199:'Murilo',
        76174:'Rodolfo',
        194914:'Rosana',
        90712:'Simone',
        204221:'Soraya',
        180259:'Tatiane',
        81216:'Daniel',
        55405:'Tatiana',
    }
    return drs[drId]
}

module.exports = { capitalizeFirstLetter, contains, timestampIsToday, convertISODate, convertCTOISO, monthShort, regex, plano, dr }