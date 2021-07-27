const handleNumber = (number = 9) => {
  let isbn = ''
  for(let i = 0; i <= number - 1; i++){
    isbn += String(Math.floor(Math.random() * 10))
  }
  console.log('isbn',`978${isbn}`)
}
handleNumber()