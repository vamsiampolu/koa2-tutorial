//import 'babel-polyfill'
import Koa from 'koa'
import kompose from 'koa-compose'

const app = new Koa()

const home = async function home (ctx,next) {
  if(ctx.path === '/') {
    ctx.body = 'Hello World!'
  } else {
    await next()
  }
}

const random = async function random (ctx,next) {
  if(ctx.path === '/random') {
    ctx.body = Math.floor(Math.random() * 10)
  } else {
    await next()
  }
}

const backwards = async function backwards (ctx,next) {
  if(ctx.path === '/backwards') {
    ctx.body = 'sdrawkcab'
  } else {
    await next()
  }
}

const pi = async function pi (ctx,next) {
  if(ctx.path === '/pi') {
    ctx.body = String(Math.PI)
  } else {
    await next()
  }
}

const body2 = kompose([random,backwards,pi,home])
console.log(body2)
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
  return async function logger(ctx,next) {
    const str = format
                  .replace(':method',ctx.method)
                  .replace(':url',ctx.url)
    console.log(str)
    await next()
  }
}

const responseTime = () => {
  return async function responseTime(ctx,next) {
    var start = new Date()
    await next()
    var ms = new Date() - start
    ctx.set('X-Response-Time',ms+'ms')
  }
}

app.use(responseTime())
app.use(logger())
app.use(body2)
app.listen(3000)
