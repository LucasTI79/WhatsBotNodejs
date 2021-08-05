const express = require('express');
const bodyParser = require('body-parser');
const client = require('./index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/public'));

app.post('/send', (req, res) => {
  client.__init(req.body.dtSend)
  res.redirect('/send.html')
})

app.listen(process.env.PORT || 3000, () => {
  console.log('server listening in http://localhost:3000')
})