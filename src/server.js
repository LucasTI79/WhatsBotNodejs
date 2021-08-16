const express = require('express');
const bodyParser = require('body-parser');
const client = require('./index');
const puppeteer = require('puppeteer');
const {puppeteerConfig} = require('./modules/client.config');

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

app.post('/reschedule', (req, res) => {
  // client.__init(req.body.dtSend)
  const { dtSend, type } = req.body;
  res.redirect('/send.html')
})

app.listen(process.env.PORT || 3000, async () => {
  console.log('server listening in http://localhost:3000') 
  const browser = await puppeteer.launch(puppeteerConfig);
  const page = await browser.newPage();
  await page.goto('http://localhost:3000');
})