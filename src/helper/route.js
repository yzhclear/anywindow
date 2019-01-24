const fs = require('fs')
const path = require('path')
const promisify = require('util').promisify
const Handlebars = require('handlebars')
const mime = require('./mime')
const compress = require('./compress')
const range = require('./range')
const isFresh = require('./cache')

const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString())

module.exports = async function (req, res, filePath, conf) {
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      const contentType = mime(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', contentType)

      // 如果缓存有效，则返回304
      if (isFresh(stats, req, res)) {
        res.statusCode = 304
        res.end()
        return
      }

      let rs 
      const { start, end, code } = range(stats.size, req, res)
      if (code === 200) {
        rs = fs.createReadStream(filePath)
      } else {
        rs = fs.createReadStream(filePath, { start, end })
      }
      if (filePath.match(conf.compress)) {
        rs = compress(rs, req, res)
      }
      rs.pipe(res)
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const dir = path.relative(conf.root, filePath)
      console.log(conf.root, filePath, dir)
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '' ,
        files
      }
      res.end(template(data))
    }
  } catch (e) {
    console.log(e)
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not a directory or file`)
  }
}