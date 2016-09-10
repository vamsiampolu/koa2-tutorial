//import 'babel-polyfill'
import Koa from 'koa'

const app = new Koa()

const firstMiddleware = async (ctx,next) => {
  console.log('Going Down')
  await next()
  console.log('Going More Up')
}

const secondMiddleware = async (ctx,next) => {
  console.log('Going More Down')
  await next()
  console.log('Going Up')
}

const responseMiddleware = async (ctx) => {
  ctx.body = 'Hello World!'
}

app.use(firstMiddleware)
app.use(secondMiddleware)
app.use(responseMiddleware)
app.listen(3000)
