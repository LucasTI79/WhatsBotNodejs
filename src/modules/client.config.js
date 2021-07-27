const { Client } = require('whatsapp-web.js');
const os = require('os')
const fs = require('fs')
const path = require('path')
const SESSION_FILE_PATH = path.resolve(__dirname,'..','..','session.json')
let sessionCfg;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionCfg = require(SESSION_FILE_PATH);
}

const plataform = os.platform()

const executablePaths = {
  "linux": "/usr/bin/google-chrome",
  "darwin": '/Applications/Google chrome.app/Contents/MacOS/Google Chrome'
}

const client = new Client({
  session: sessionCfg,
  puppeteer: {
    headless: false,
    executablePath: executablePaths[plataform]
  }
})

module.exports = client;
