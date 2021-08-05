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

const puppeteerConfig = {
  headless: false,
  executablePath: executablePaths[plataform],
  defaultViewport: null,
  ignoreDefaultArgs: ['--disable-extensions'],
  args: ["--no-sandbox"]
}

const client = new Client({
  session: sessionCfg,
  puppeteer: puppeteerConfig
})

module.exports = { client, puppeteerConfig };
