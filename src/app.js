const http = require('http')
const chalk = require('chalk')
const conf = require('./config/defaultConfig')

const server = http.createServer((req, res) => {
  console.log(req)
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello HTTP')
})

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`
  console.log(`Server started at ${chalk.blue(addr)}`)
})
