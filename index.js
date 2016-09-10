//import 'babel-polyfill'
import Koa from 'koa'

const app = new Koa()


const contentLength = () => {
  return async function(ctx,next) {
    await next()
    if(!ctx.body) {
        return
    }
    ctx.set('Content-Length',ctx.body.length)
  }
}

const body = () => {
  return async function(ctx,next) {
    const {path} = ctx
    if(path !== '/') {
      return
    }
    ctx.body = 'Hello World!'
  }
}

const logger = (format) => {
  format = format || "':method' ':url'"
  return async function(ctx,next) {
    const str = format
                  .replace(':method',ctx.method)
                  .replace(':url',ctx.url)
    console.log(str)
    await next()
  }
}

const responseTime = () => {
  return async function(ctx,next) {
    var start = new Date()
    await next()
    var ms = new Date() - start
    ctx.set('X-Response-Time',ms+'ms')
  }
}

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

app.use(responseTime())
app.use(firstMiddleware)
app.use(secondMiddleware)
app.use(logger())
app.use(responseMiddleware)

app.listen(3000)
