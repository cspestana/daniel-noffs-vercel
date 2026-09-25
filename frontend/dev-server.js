import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = 5173

function getMimeType(filePath) {
  const ext = path.extname(filePath)
  const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
  }
  return mimeTypes[ext] || 'text/plain'
}

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url)
  
  if (filePath.endsWith('/')) {
    filePath = path.join(filePath, 'index.html')
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')
      res.end(html)
    } else {
      res.writeHead(200, { 'Content-Type': getMimeType(filePath) })
      res.end(data)
    }
  })
})

server.listen(PORT, () => {
  console.log(`✓ Servidor rodando em http://localhost:${PORT}`)
})