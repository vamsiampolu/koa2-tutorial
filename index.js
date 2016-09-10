//import 'babel-polyfill'
import Koa from 'koa'

const app = new Koa()

const responseMiddleware = async (ctx) => {
  ctx.body = 'Hello World!'
}

app.use(responseMiddleware)
app.listen(3000)
