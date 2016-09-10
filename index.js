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
    await next()
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

app.use(responseTime())
app.use(body())
app.use(logger())
app.listen(3000)
